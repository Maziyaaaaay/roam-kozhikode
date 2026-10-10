import bpy, math, random
from mathutils import Vector
random.seed(12)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene
scene.world=bpy.data.worlds.new('Coastal afternoon')
scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs[0].default_value=(0.52,0.72,0.79,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value=.7
materials={}
for name,color in {'Plaster':(.65,.38,.20,1),'Trim':(.88,.75,.51,1),'SeaGlass':(.17,.38,.34,1),'Wood':(.26,.13,.06,1),'Tile':(.49,.20,.10,1),'Leaf':(.15,.28,.09,1),'Paper':(.94,.85,.65,1),'Coffee':(.16,.08,.03,1)}.items():
 m=bpy.data.materials.new(name);m.diffuse_color=color;m.use_nodes=True;m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=color;m.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.8;materials[name]=m

def cube(name,size,pos,material,bevel=.04):
 bpy.ops.mesh.primitive_cube_add(size=1,location=pos);o=bpy.context.object;o.name=name;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(materials[material])
 if bevel:
  mod=o.modifiers.new('Soft crafted edges','BEVEL');mod.width=bevel;mod.segments=3
  o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
 return o

def sphere(name,pos,scale,material):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=14,ring_count=8,location=pos);o=bpy.context.object;o.name=name;o.scale=scale;o.data.materials.append(materials[material]);bpy.ops.object.shade_smooth();return o

def cylinder(name,r,depth,pos,material):
 bpy.ops.mesh.primitive_cylinder_add(vertices=16,radius=r,depth=depth,location=pos);o=bpy.context.object;o.name=name;o.data.materials.append(materials[material]);return o

def text(body,size,pos):
 curve=bpy.data.curves.new(body,'FONT');curve.body=body;curve.size=size;curve.align_x='CENTER';curve.extrude=.003;o=bpy.data.objects.new(body,curve);bpy.context.collection.objects.link(o);o.location=pos;o.rotation_euler=(math.pi/2,0,0);o.data.materials.append(materials['Paper'])
# z-up, front faces toward -y, portable GLB exports as y-up
cube('Facade',(5,5 and 2.2,5.8),(0,0,2.9),'Plaster',.09)
for z in [.18,3.15,5.7]:cube('Cornice',(5.35,2.4,.17),(0,0,z),'Trim')
# Detailed upper windows, inset glass and shutter leaves
for x in [-1.5,0,1.5]:
 cube('Window surround',(1.05,.16,1.75),(x,-1.17,4.2),'Trim')
 cube('Window glass',(.82,.13,1.53),(x,-1.27,4.2),'SeaGlass')
 for xx in [-.32,.32]:
  cube('Shutter',(.25,.11,1.48),(x+xx,-1.37,4.2),'Wood')
  for z in [3.65,3.85,4.05,4.25,4.45,4.65]:cube('Shutter slat',(.26,.035,.035),(x+xx,-1.44,z),'Trim',.008)
 cube('Window sill',(1.2,.4,.12),(x,-1.3,3.3),'Trim')
# Balcony and turnings
cube('Balcony deck',(4.8,1.05,.16),(0,-1.52,3.0),'Trim')
for i in range(23):
 x=-2.2+i*.2;cylinder('Baluster',.026,.65,(x,-2,3.4),'Wood');sphere('Baluster detail',(x,-2,3.35),(.055,.055,.095),'Wood')
cube('Balcony rail',(4.7,.1,.1),(0,-2,3.77),'Wood')
for x in [-1.5,0,1.5]:
 cube('Shop doorway',(1.22,.2,2.1),(x,-1.18,1.25),'Wood')
 cube('Shop glass',(1.02,.1,1.9),(x,-1.31,1.26),'SeaGlass')
 cube('Door mullion',(.045,.07,1.95),(x,-1.4,1.26),'Trim')
# striped canopy and scalloped valance
for i in range(12):
 x=-2.4+i*.435;awning=cube('Canopy stripe',(.43,1.6,.08),(x,-1.8,2.75),'SeaGlass' if i%2 else 'Trim');awning.rotation_euler[0]=-.12
 cube('Valance',(.43,.07,.22),(x,-2.55,2.56),'SeaGlass' if i%2 else 'Trim',.06)
cube('Signboard',(4.5,.13,.5),(0,-1.32,2.96),'Wood');text('THE POSTCARD CAFE',.23,(0,-1.4,2.88))
# tiles on sloped roof
for side in [-1,1]:
 for row in range(5):
  for col in range(18):
   tile=cube('Terracotta roof tile',(.3,.43,.09),(-2.5+col*.3,side*(.1+row*.25),6.32-row*.12),'Tile',.04);tile.rotation_euler[0]=side*.3
# terrace tables, cups, potted foliage and the clue
cube('Cafe terrace',(6,3,.14),(0,-2.55,.07),'Trim')
for x in [-1.45,1.45]:
 cylinder('Table foot',.065,.85,(x,-2.8,.5),'Wood');cylinder('Table top',.58,.09,(x,-2.8,.96),'Wood');cylinder('Cup',.08,.14,(x,-2.8,1.07),'Paper');cylinder('Coffee',.067,.01,(x,-2.8,1.145),'Coffee')
 for y in [-2.2,-3.4]:
  cube('Chair seat',(.45,.45,.08),(x,y,.52),'Wood');cube('Chair back',(.45,.08,.65),(x,y+.2,.83),'Wood')
  for dx in [-.17,.17]:
   for dy in [-.17,.17]:cube('Chair leg',(.055,.055,.5),(x+dx,y+dy,.25),'Wood')
for x in [-2.7,2.7]:
 cylinder('Plant pot',.3,.55,(x,-2.6,.35),'Tile')
 for i in range(18):sphere('Foliage',(x+random.uniform(-.3,.3),-2.6+random.uniform(-.3,.3),.7+random.random()*.65),(.2,.12,.3),'Leaf')
cube('Postcard',(.42,.015,.28),(0,-1.5,1.6),'Paper',.015)
# Camera and daylight for review
bpy.ops.object.light_add(type='AREA',location=(-4,-6,10));light=bpy.context.object;light.name='Warm sun';light.data.energy=1500;light.data.shape='DISK';light.data.size=5
light.rotation_euler=(Vector((0,0,2))-light.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(9,-12,7));camera=bpy.context.object;camera.name='Delivery camera';camera.rotation_euler=(Vector((0,-1,2.7))-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.lens=45;scene.camera=camera
scene.render.engine='BLENDER_EEVEE';scene.render.resolution_x=900;scene.render.resolution_y=700;scene.render.resolution_percentage=100
result={'objects':len(bpy.data.objects),'asset':'Detailed postcard cafe, fictional authored story set piece','camera':camera.name,'units':'meters'}
