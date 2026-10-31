import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';import {resolve,dirname} from 'node:path';import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex'),p=JSON.parse(await readFile('SOURCE.json'));
const PINS=[['MODEL-PARTS.json','api/vision/object-quality/models/objects-basira-v3/assets/yolox/yolox_tiny.onnx','1f0e088797c8792329c0270151fc375193158f5406a94c9c214cfb3d72e54a38',20258925,/^\.delivery\/v3-\d{2}\.bin$/],
 ['MODEL-PARTS-S.json','api/vision/object-quality/models/objects-yolox-s/assets/yolox/yolox_s.onnx','c5c2d13e59ae883e6af3b45daea64af4833a4951c92d116ec270d9ddbe998063',35858002,/^\.delivery\/ys-\d{2}\.bin$/]];
const assembled=[];
for(const [file,target,sha,bytes,pattern] of PINS){const m=JSON.parse(await readFile(file));
if(m.target!==target||m.sha256!==sha||m.bytes!==bytes)throw Error('Unqualified model transport');
const chunks=[];for(const r of m.parts){if(!pattern.test(r.path))throw Error('Invalid part');const b=await readFile(r.path);if(b.length!==r.bytes||hash(b)!==r.sha256)throw Error('Changed transport part');chunks.push(b);}
const model=Buffer.concat(chunks);if(model.length!==m.bytes||hash(model)!==m.sha256)throw Error('ONNX reassembly mismatch');await mkdir(dirname(m.target),{recursive:true});
try{const prior=await readFile(m.target);if(hash(prior)!==m.sha256)throw Error('Refuse to replace an existing different model');}catch(e){if(e.code!=='ENOENT')throw e;await writeFile(m.target,model,{flag:'wx'});}
assembled.push(hash(model));}
await mkdir('dist');for(const r of p.files){const b=await readFile(r.path);if(b.length!==r.bytes||hash(b)!==r.sha256)throw Error('Changed runtime file');await mkdir(dirname(resolve('dist',r.path)),{recursive:true});await copyFile(r.path,resolve('dist',r.path));}
for(const name of ['README.md','SOURCE.json'])await copyFile(name,resolve('dist',name));
const notices=JSON.parse(await readFile('third-party-notices/catalog.json'));await mkdir('dist/third-party-notices');for(const r of notices.entries){if(!/^[a-zA-Z0-9_.-]+$/.test(r.file))throw Error('Invalid notice');const b=await readFile('third-party-notices/'+r.file);if(hash(b)!==r.sha256)throw Error('Changed licence notice');await copyFile('third-party-notices/'+r.file,'dist/third-party-notices/'+r.file);}await copyFile('third-party-notices/catalog.json','dist/third-party-notices/catalog.json');
console.log(JSON.stringify({assembledModelSha256:assembled,verifiedRuntimeFiles:p.files.length,transportPartsPublished:false,iphoneTested:false}));
