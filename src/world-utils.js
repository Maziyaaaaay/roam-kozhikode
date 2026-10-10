import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// Blender and procedural meshes can differ in indexing and attributes.
// Normalize disposable copies before batching so an entire material group cannot vanish.
export function mergeCompatible(geometries){
 const prepared=geometries.map(source=>{const g=source.clone();for(const key of Object.keys(g.attributes))if(!['position','normal','uv'].includes(key))g.deleteAttribute(key);if(!g.attributes.normal)g.computeVertexNormals();if(!g.attributes.uv)g.setAttribute('uv',new T.BufferAttribute(new Float32Array(g.attributes.position.count*2),2));if(!g.index)g.setIndex(new T.BufferAttribute(Uint32Array.from({length:g.attributes.position.count},(_,i)=>i),1));return g;});
 const merged=mergeGeometries(prepared,false);prepared.forEach(g=>g.dispose());if(!merged)throw new Error('World geometry batching failed');return merged;
}
