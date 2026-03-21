'use strict';

/* =====================================================
   SECTION 1: DATA DEFINITIONS
   ===================================================== */

const ITEM_DATA = [
  {id:0,name:'Mona Decoy Doll',desc:'When you\'re about to be defeated, it disappears in your place. The doll smiles gently.',price:20000,type:'collection',effect:0,stat:'',target:'self',minFloor:26,maxFloor:9999},
  {id:1,name:'MonaEnergy (Small)',desc:'The classic energy drink that fills you with power. Explorer\'s favorite. Restores 30 HP.',price:60,type:'use',effect:30,stat:'hp',target:'self',minFloor:6,maxFloor:15},
  {id:2,name:'MonaEnergy (Medium)',desc:'A slightly larger can of energy drink. Don\'t overdo it. Restores 90 HP.',price:150,type:'use',effect:90,stat:'hp',target:'self',minFloor:16,maxFloor:30},
  {id:3,name:'MonaEnergy (Large)',desc:'The biggest can of energy drink. One sip away from lethal. Restores 180 HP.',price:270,type:'use',effect:180,stat:'hp',target:'self',minFloor:31,maxFloor:9999},
  {id:4,name:'Lawnmower',desc:'A weapon item that absolutely does not allow any "lol". Boosts AT by 3 stages.',price:450,type:'use',effect:3,stat:'at',target:'self',minFloor:31,maxFloor:9999},
  {id:5,name:'Read-Only Mode',desc:'Go full lurker mode and harden your defenses. Boosts DF by 1 stage.',price:120,type:'use',effect:1,stat:'df',target:'self',minFloor:5,maxFloor:20},
  {id:6,name:'Anti-Comment',desc:'A cutting post attack aimed at the enemy. Deals 50 HP damage to enemy.',price:75,type:'use',effect:-50,stat:'hp',target:'enemy',minFloor:1,maxFloor:50},
  {id:7,name:'Thin Book',desc:'A thin volume packed with dense wisdom. EXP +10000.',price:3000,type:'use',effect:10000,stat:'exp',target:'self',minFloor:51,maxFloor:9999},
  {id:8,name:'Strong Mona',desc:'An all-purpose drink that sends you flying. Fully restores HP.',price:1000,type:'use',effect:9999,stat:'hp',target:'self',minFloor:51,maxFloor:9999},
  {id:9,name:'Browser Crasher',desc:'A malicious interference item. Send it to the enemy to weaken them. Lowers enemy DF by 1 stage.',price:120,type:'use',effect:-1,stat:'df',target:'enemy',minFloor:3,maxFloor:50},
  {id:10,name:'Old MonaCoin',desc:'A long-unredeemed virtual coin. No one remembers when it was bought. Deals 10 HP damage to enemy.',price:10,type:'use',effect:-10,stat:'hp',target:'enemy',minFloor:1,maxFloor:9999},
  {id:11,name:'Multi-Cannon',desc:'An attack item that delivers multiple hits. Deals 100 HP damage to enemy.',price:140,type:'use',effect:-100,stat:'hp',target:'enemy',minFloor:25,maxFloor:50},
  {id:12,name:'Jumpscare Flash',desc:'Startles the enemy into losing their fighting spirit. Lowers enemy AT by 1 stage.',price:160,type:'use',effect:-1,stat:'at',target:'enemy',minFloor:15,maxFloor:9999},
  {id:13,name:'Dumbbell',desc:'A weighty weapon item even on its own. Boosts AT by 1 stage.',price:160,type:'use',effect:1,stat:'at',target:'self',minFloor:6,maxFloor:25},
  {id:14,name:'Rice Ball',desc:'A simple salted rice ball wrapped in seaweed. Restores 5 HP.',price:11,type:'use',effect:5,stat:'hp',target:'self',minFloor:1,maxFloor:5},
  {id:15,name:'Sweets lol',desc:'Hurl sweets at the enemy with sarcastic flair. Lowers enemy AT by 1 stage.',price:130,type:'use',effect:-1,stat:'at',target:'enemy',minFloor:3,maxFloor:30},
  {id:16,name:'Pickled Plum Rice Ball',desc:'A rice ball filled with pickled plum. Restores 15 HP.',price:32,type:'use',effect:15,stat:'hp',target:'self',minFloor:6,maxFloor:15},
  {id:17,name:'Giant Dog Plushie',desc:'A life-size dog plushie. Its overwhelming cuteness wins over even enemies. Lowers enemy DF by 6 stages.',price:480,type:'use',effect:-6,stat:'df',target:'enemy',minFloor:9999,maxFloor:9999},
  {id:18,name:'Dog Food',desc:'Dog chow. Not suited to human taste. Restores 5 HP.',price:5,type:'use',effect:5,stat:'hp',target:'self',minFloor:9999,maxFloor:9999},
  {id:19,name:'Shiny MonaCoin',desc:'A brand-new virtual coin fresh off the press. A rare item good for investing or throwing. Deals 200 HP damage to enemy.',price:240,type:'use',effect:-200,stat:'hp',target:'enemy',minFloor:30,maxFloor:9999},
  {id:20,name:'Giant Kuma Plushie',desc:'A life-size Kuma plushie. Great for hugging or swinging around as a weapon. Boosts AT by 6 stages.',price:800,type:'use',effect:6,stat:'at',target:'self',minFloor:9999,maxFloor:9999},
  {id:21,name:'Mystery Rice Ball',desc:'A rice ball with unknown filling. Target, effect, and amount are completely random.',price:50,type:'use',effect:1,stat:'random',target:'self',minFloor:16,maxFloor:9999},
  {id:22,name:'Info Product',desc:'Looks like useful intel, but the content is suspiciously thin. EXP +500.',price:200,type:'use',effect:500,stat:'exp',target:'self',minFloor:1,maxFloor:20},
  {id:23,name:'Official Dungeon Guide',desc:'A strategy guide officially provided by the Guild. EXP +2500.',price:900,type:'use',effect:2500,stat:'exp',target:'self',minFloor:21,maxFloor:50},
  {id:24,name:'Mona Plate',desc:'Doing good beats doing nothing. A collection item showing charitable results. Collect 100 and…?',price:9430,type:'collection',effect:0,stat:'plate',target:'self',minFloor:11,maxFloor:9999},
  {id:25,name:'Lucky Tea',desc:'A lucky tea with a floating tea stalk. Win a battle after drinking it and an item drop is guaranteed.',price:500,type:'use',effect:1,stat:'lucky',target:'self',minFloor:21,maxFloor:9999},
  {id:26,name:'Microwave',desc:'A nuisance item that causes delays while in use. Lowers enemy SP by 1 stage.',price:100,type:'use',effect:-1,stat:'sp',target:'enemy',minFloor:10,maxFloor:9999},
  {id:27,name:'Manutar Sword',desc:'A legendary attack item that does not consume itself. Deals 100 HP damage to enemy.',price:100000,type:'use',effect:-100,stat:'nousedhp',target:'enemy',minFloor:100,maxFloor:100},
  {id:28,name:'Security Software',desc:'Windows Defender is enough these days, but it\'s good to be prepared. Boosts DF by 2 stages.',price:200,type:'use',effect:2,stat:'df',target:'self',minFloor:21,maxFloor:9999},
  {id:29,name:'Red Room',desc:'A legendary horror Flash that once terrified users. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:30,name:'Manju (Shrine Maiden Flavor)',desc:'A red manju that looks just like a head. Filled with fine bean paste. Restores HP to 30 and raises SP and DF each by 1 stage.',price:1000,type:'use',effect:1,stat:'custom1',target:'self',minFloor:26,maxFloor:9999},
  {id:31,name:'Manju (Witch Flavor)',desc:'A yellow manju that looks just like a head. Filled with fine bean paste. Deals 30 HP damage to enemy and raises your SP and AT each by 1 stage.',price:1000,type:'use',effect:1,stat:'custom2',target:'self',minFloor:26,maxFloor:9999},
  {id:32,name:'Throwaway Account',desc:'A disposable account prepared just in case. While held, if you would take 20+ damage, one is consumed to reduce damage to 0.',price:500,type:'collection',effect:0,stat:'guard',target:'self',minFloor:30,maxFloor:9999},
  {id:33,name:'Dark Blade Manutar Sword\u0414',desc:'A legendary evil blade on the verge of corruption. Deals 810 HP damage to enemy without consuming itself.',price:1145141919810,type:'use',effect:-810,stat:'nousedhp',target:'enemy',minFloor:1919810,maxFloor:1919810},
  {id:34,name:'Manju (Demon Flavor)',desc:'A sinister blue manju that looks just like a head. Filled with ominous bean paste. Fully restores HP and raises all stats by 2 stages each.',price:10000,type:'use',effect:2,stat:'custom3',target:'self',minFloor:201,maxFloor:9999},
  {id:35,name:'Dorayaki',desc:'A delicious sweet filled with red bean paste. Restores 300 HP.',price:400,type:'use',effect:300,stat:'hp',target:'self',minFloor:46,maxFloor:9999},
  {id:36,name:'Matcha',desc:'Traditional Japanese green tea. Drinking it raises SP by 1 stage.',price:110,type:'use',effect:1,stat:'sp',target:'self',minFloor:4,maxFloor:20},
  {id:37,name:'Cat Treat',desc:'Cats go crazy for it and lose all will to fight. Lowers enemy AT by 1 stage.',price:130,type:'use',effect:1,stat:'at',target:'enemy',minFloor:43,maxFloor:45},
  {id:38,name:'Fried Chicken??',desc:'Fried chicken made with questionable meat from a questionable country. Somehow delicious. Restores 300 HP.',price:350,type:'use',effect:300,stat:'hp',target:'self',minFloor:9999,maxFloor:9999},
  {id:39,name:'Rice Wine',desc:'Can\'t stop drinking. Restores 100 HP.',price:150,type:'use',effect:100,stat:'hp',target:'self',minFloor:21,maxFloor:50},
  {id:40,name:'Karakuri Maid',desc:'A 3D gun action game made by the Sub-Thread Master long ago. A memorable first completed long-term project.',price:100,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:41,name:'Slime Brother Maker',desc:'A 2-player co-op puzzle game with stage creation and sharing, made by the Sub-Thread Master. A remake is currently under consideration.',price:200,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:42,name:'Red Mushroom',desc:'Taking it makes you big and heavy. Lowers enemy SP by 2 stages.',price:180,type:'use',effect:-2,stat:'sp',target:'enemy',minFloor:9999,maxFloor:9999},
  {id:43,name:'Fire Flower',desc:'Taking it sets you ablaze; you cry "I\'m burning!!" and promptly perish. Deals 75 HP damage to enemy.',price:75,type:'use',effect:-75,stat:'hp',target:'enemy',minFloor:9999,maxFloor:9999},
  {id:44,name:'Cardboard Box',desc:'A perfectly ordinary cardboard box. Might protect you? Boosts DF by 2 stages.',price:200,type:'use',effect:2,stat:'df',target:'self',minFloor:31,maxFloor:9999},
  {id:45,name:'Golden Egg',desc:'A gloriously shining rare egg. Throw it to deal 200 HP damage to enemy.',price:220,type:'use',effect:-200,stat:'hp',target:'enemy',minFloor:9999,maxFloor:9999},
  {id:46,name:'Salt Seasoning',desc:'Salt that hurts if it gets in your eyes or wounds. Deals 15 HP damage to enemy.',price:15,type:'use',effect:-15,stat:'hp',target:'enemy',minFloor:9999,maxFloor:9999},
  {id:47,name:'Moscow',desc:'A famous misheard-lyrics Flash animation from the old days. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:48,name:'Life Is Owata Adventure',desc:'A legendary Flash game once playable online. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:49,name:'Generic Squadron \u25cb\u25cbRanger',desc:'A legendary Flash game once playable online. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:50,name:'Shao Shao Series',desc:'A legendary Flash series once playable online. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:51,name:'Nobuyuki Squad 3',desc:'A legendary Flash game once playable online. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:52,name:'Naval Bombardment',desc:'A legendary Flash game once playable online. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
  {id:53,name:"Mr. Bear's Home Run Derby",desc:'A famous Flash game once playable online. One of the lost collection items.',price:0,type:'collection',effect:0,stat:'',target:'self',minFloor:9999,maxFloor:9999},
];

const MONSTER_DATA = [
  {id:0,name:'MonaSlime',maxLv:1,drops:[1,1,1,1,1,1,1,1,10,10,10,10,10,50],coinRange:[2,6],expRange:[6,15],hp1:10,at1:2,df1:1,sp1:6,type:'normal',bossDialog:['\n　 ∧＿∧　　\n　（　´∀｀）'],floorRange:[1,9],patterns:[{a:'attack'},{a:'guard'}],weakness:10,bgm:'./BGM/battlebgm_mona.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:1,name:'Anti-Mona',maxLv:2,drops:[6,6,6,6,6,6,5],coinRange:[10,20],expRange:[7,27],hp1:12,at1:8,df1:2,sp1:6,type:'normal',bossDialog:['\n　 ∧＿∧　　\n　（　´∀｀）'],floorRange:[2,20],patterns:[{a:'charge'},{a:'enemyrun'},{a:'attack'}],weakness:27,bgm:'./BGM/battlebgm_anti.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:2,name:'Riceball',maxLv:1,drops:[36,14,14,14,14,25],coinRange:[5,18],expRange:[6,18],hp1:14,at1:3,df1:6,sp1:4,type:'normal',bossDialog:['\n ／■＼\n(´∀`∩)\n(つ　　丿\n (　ヽノ\n し(＿)'],floorRange:[1,9],patterns:[{a:'guard'},{a:'attack'},{a:'heal'}],weakness:15,bgm:'./BGM/battlebgm_normal2.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.1},
  {id:3,name:'Riceball Parade',maxLv:2,drops:[36,14,14,16,16,25],coinRange:[7,22],expRange:[10,27],hp1:21,at1:6,df1:6,sp1:12,type:'double',bossDialog:['\n`／■＼　／■＼\n( ･∀･∩(･∀･∩)\n(つ　 ノ(つ　 丿\nヽ　( ノ (　 ノ\n(＿)し" し(＿)'],floorRange:[3,15],patterns:[{a:'charge'},{a:'enemyitem'},{a:'attack'},{a:'heal'}],weakness:15,bgm:'./BGM/battlebgm_normal2.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.1},
  {id:4,name:'Metal MonaSlime',maxLv:3,drops:[1,1,1,5,5,10,22,22,23],coinRange:[1,5],expRange:[750,1500],hp1:24,at1:6,df1:9999,sp1:18,type:'normal',bossDialog:['\n　 ∧＿∧　　\n　（　´∀｀）'],floorRange:[5,9999],patterns:[{a:'guard'},{a:'heal'},{a:'run'}],weakness:10,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.01,at:1.15,df:1.12,sp:1.1},healRate:0.1},
  {id:5,name:'Gold MonaSlime',maxLv:3,drops:[1,1,10,10,19,2],coinRange:[500,1000],expRange:[18,33],hp1:12,at1:14,df1:9999,sp1:18,type:'normal',bossDialog:['\n　 ∧＿∧　　\n　（　´∀｀）'],floorRange:[5,9999],patterns:[{a:'charge'},{a:'attack'},{a:'run'}],weakness:10,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.01,at:1.15,df:1.12,sp:1.1},healRate:0},
  {id:6,name:'Dog',maxLv:2,drops:[18,18,18,18,18,18,18,17],coinRange:[8,28],expRange:[16,48],hp1:24,at1:10,df1:4,sp1:10,type:'normal',bossDialog:[],floorRange:[11,30],patterns:[{a:'enemysearch'},{a:'attack'},{a:'heal'},{a:'attack'},{a:'run'}],weakness:12,bgm:null,growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.1},
  {id:7,name:'Yaruo-Que',maxLv:2,drops:[2,2,2,2,2,3,22,23],coinRange:[7,21],expRange:[28,54],hp1:56,at1:12,df1:1,sp1:3,type:'normal',bossDialog:[`\n　 　　 　　＿＿＿_\n　 　　　／　　 　 　＼\n　　　／　 _ノ 　ヽ､_　 ＼\n　 ／　oﾟ(（●）) 　 (（●）)ﾟo　＼ \n　 |　　　（__人__）'　　　|\n　 ＼　　 　　｀⌒´ 　 　 ／`],floorRange:[26,65],patterns:[{a:'enemyrun'},{a:'attack'},{a:'attack'}],weakness:9,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:8,name:'Noma Cat',maxLv:2,drops:[39,46,46,8,10,10,10,1,1,1,2,1,1,1,2],coinRange:[10,20],expRange:[7,27],hp1:24,at1:8,df1:14,sp1:14,type:'normal',bossDialog:['\n　　　∧＿∧\n　　 （　 *ﾟwﾟ）'],floorRange:[11,30],patterns:[{a:'charge'},{a:'charge'},{a:'heal'},{a:'critical'},{a:'attack'},{a:'critical'}],weakness:12,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:9,name:'MonaTaur',maxLv:2,drops:[14,14,16,13],coinRange:[7,21],expRange:[28,54],hp1:22,at1:14,df1:1,sp1:10,type:'normal',bossDialog:['\n　 ∧＿∧　　\n　（　´∀｀）'],floorRange:[16,65],patterns:[{a:'charge'},{a:'charge'},{a:'attack'},{a:'charge'},{a:'attack'}],weakness:12,bgm:'./BGM/battlebgm_mona.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:10,name:'World Owata (OP)',maxLv:5,drops:[48,43,42,32,3,8,49],coinRange:[15,50],expRange:[40,70],hp1:66,at1:666,df1:6,sp1:6,type:'boss',bossDialog:['\\(^o^)/ OWATA'],floorRange:[80,80],patterns:[{a:'enemycharge'},{a:'attack'},{a:'counter'},{a:'guard'},{a:'attack'},{a:'guard'},{a:'attack'},{a:'enemycharge'},{a:'attack'},{a:'guard'},{a:'counter'},{a:'heal'},{a:'selfdestruct'}],weakness:6,bgm:'./BGM/battlebgm_serious.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:11,name:'Universe Owata (OP)',maxLv:5,drops:[48,43,42,8,0,49],coinRange:[25,70],expRange:[50,90],hp1:99,at1:999,df1:9,sp1:9,type:'doubleboss',bossDialog:['\\(^o^)/ OWATA'],floorRange:[85,85],patterns:[{a:'enemycharge'},{a:'attack'},{a:'guard'},{a:'attack'},{a:'enemycharge'},{a:'enemyguard'},{a:'counter'},{a:'enemyitem'},{a:'attack'},{a:'enemyattack'},{a:'attack'},{a:'critical'},{a:'enemycharge'},{a:'enemyitem'},{a:'heal'},{a:'selfdestruct'}],weakness:19,bgm:'./BGM/battlebgm_serious.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:12,name:'Speed Yaruo',maxLv:3,drops:[4,7,3,8,11],coinRange:[35,100],expRange:[75,150],hp1:1,at1:25,df1:1,sp1:100,type:'double',bossDialog:[],floorRange:[66,9999],patterns:[{a:'charge'},{a:'critical'},{a:'run'}],weakness:11,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1,at:1.25,df:1,sp:1.5},healRate:0},
  {id:13,name:'Hiki Bat',maxLv:1,drops:[1,1,1,1,5,6],coinRange:[4,11],expRange:[6,18],hp1:12,at1:4,df1:12,sp1:4,type:'normal',bossDialog:['\n (-＿-) "...just wanna disappear..."'],floorRange:[1,9],patterns:[{a:'enemysearch'},{a:'counter'},{a:'guard'},{a:'counter'},{a:'heal'}],weakness:12,bgm:null,growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.1},
  {id:14,name:'Slacker Moai (OP)',maxLv:5,drops:[11,2,2,13],coinRange:[40,80],expRange:[90,150],hp1:48,at1:6,df1:20,sp1:1,type:'boss',bossDialog:['\n　　　　　 ／￣￣＼\n　　　　／　　 _ノ　　＼\n　　　　|　　　 （ ●）（●）\n　　　　|　　　　 （__人__）\n　　　　 |　　　　　｀ ⌒´ﾉ\n  　　　　|　　　　　　 　 }'],floorRange:[5,5],patterns:[{a:'enemycharge'},{a:'charge'},{a:'charge'},{a:'attack'},{a:'guard'}],weakness:13,bgm:'./BGM/battlebgm_yaranaio.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0},
  {id:15,name:'Queen Neki (OP)',maxLv:5,drops:[6,2,2,23,7,15,2],coinRange:[60,100],expRange:[99,180],hp1:80,at1:7,df1:12,sp1:14,type:'boss',bossDialog:['"……(gazing down at you from on high)"'],floorRange:[20,20],patterns:[{a:'enemyitem'},{a:'critical'},{a:'attack'},{a:'heal'},{a:'enemycharge'},{a:'attack'},{a:'heal'}],weakness:6,bgm:'./BGM/battlebgm_queen.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:16,name:'King MonaSlime (OP)',maxLv:5,drops:[47,2,2,3,3,24,10,10,19,0],coinRange:[60,90],expRange:[270,630],hp1:60,at1:8,df1:16,sp1:16,type:'boss',bossDialog:['\n　 ∧＿∧　　\n　（　´∀｀）'],floorRange:[25,25],patterns:[{a:'charge'},{a:'guard'},{a:'charge'},{a:'attack'},{a:'heal'},{a:'enemycharge'},{a:'attack'}],weakness:19,bgm:'./BGM/battlebgm_king.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:17,name:'Berserker Yaruo (OP)',maxLv:5,drops:[2,3,3,4,13,8,7,29],coinRange:[90,160],expRange:[70,110],hp1:50,at1:20,df1:10,sp1:50,type:'boss',bossDialog:['\n　　　　　 　　　＿＿＿_\n　　　　　　　／::::::::::　 u＼\n　　　　 　／:::::::::⌒ 三. ⌒＼\n　　　　／:::::::::: （ ○）三（○）＼\n　　　　|::::::::::::::::⌒（__人__）⌒\n　 　　 ＼::::::::::　　 ｀ ⌒´ 　 ,／\n　　　　ノ::::::::::u 　　　　　　 　＼'],floorRange:[30,30],patterns:[{a:'attack'},{a:'critical'},{a:'attack'}],weakness:12,bgm:'./BGM/battlebgm_speed.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0},
  {id:18,name:'Neeno (OP)',maxLv:5,drops:[3,8,25,35,24,19],coinRange:[25,50],expRange:[30,70],hp1:70,at1:25,df1:20,sp1:20,type:'doubleboss',bossDialog:['\n　　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　Being a boss is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[70,70],patterns:[{a:'enemyguard'},{a:'attack'},{a:'critical'},{a:'attack'},{a:'enemycharge'},{a:'heal'},{a:'attack'},{a:'enemyitem'}],weakness:19,bgm:'./BGM/battlebgm_neno.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:19,name:'Anti-Kuma (OP)',maxLv:5,drops:[53,20,20,8,8,27,27,6],coinRange:[220,400],expRange:[340,500],hp1:120,at1:50,df1:16,sp1:80,type:'doubleboss',bossDialog:['\n　　 ∩＿＿＿∩\n　　 | ノ　　　　ヽ\n　　/　　●　　●|  Kuma──!!\n　 |　　　( _●_)　ミ\n　彡､　　 |∪|  ､｀＼\n/　＿＿  ヽノ\n´>　)\n(＿＿＿）　/  (_／\n　|　　　　/\n　|　 ／＼ ＼\n　| /　　  )  )\n　∪　　 （  ＼\n　　　　　 ＼＿)'],floorRange:[100,9999],patterns:[{a:'attack'},{a:'charge'},{a:'charge'},{a:'charge'},{a:'enemycharge'},{a:'enemyguard'},{a:'critical'},{a:'attack'},{a:'guard'},{a:'enemyitem'},{a:'attack'},{a:'attack'},{a:'guard'},{a:'charge'},{a:'heal'}],weakness:27,bgm:'./BGM/battlebgm_irregular.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:20,name:'Metal Kuma',maxLv:3,drops:[53,13,13,20,20,8,8],coinRange:[100,300],expRange:[1500,4500],hp1:80,at1:18,df1:9999,sp1:60,type:'undead',bossDialog:['\n　　 ∩＿＿＿∩\n　　 | ノ　　　　ヽ\n　　/　　●　　●|  Kuma──!!\n　 |　　　( _●_)　ミ\n　彡､　　 |∪|  ､｀＼\n/　＿＿  ヽノ\n´>　)\n(＿＿＿）　/  (_／\n　|　　　　/\n　|　 ／＼ ＼\n　| /　　  )  )\n　∪　　 （  ＼\n　　　　　 ＼＿)'],floorRange:[101,9999],patterns:[{a:'enemyitem'},{a:'attack'},{a:'enemyguard'},{a:'critical'},{a:'attack'},{a:'attack'},{a:'counter'},{a:'enemyitem'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'heal'},{a:'selfdestruct'}],weakness:10,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.01,at:1.12,df:1.08,sp:1.05},healRate:0.25},
  {id:21,name:'Gold Kuma',maxLv:3,drops:[53,19,19,20,20,8,8],coinRange:[1000,3000],expRange:[150,450],hp1:100,at1:36,df1:9999,sp1:30,type:'double',bossDialog:['\n　　 ∩＿＿＿∩\n　　 | ノ　　　　ヽ\n　　/　　●　　●|  Kuma──!!\n　 |　　　( _●_)　ミ\n　彡､　　 |∪|  ､｀＼\n/　＿＿  ヽノ\n´>　)\n(＿＿＿）　/  (_／\n　|　　　　/\n　|　 ／＼ ＼\n　| /　　  )  )\n　∪　　 （  ＼\n　　　　　 ＼＿)'],floorRange:[101,9999],patterns:[{a:'charge'},{a:'charge'},{a:'enemycharge'},{a:'enemyitem'},{a:'attack'},{a:'critical'},{a:'charge'},{a:'enemyguard'},{a:'attack'}],weakness:10,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.01,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:22,name:'Slacker Moai (Enhanced OP)',maxLv:5,drops:[11,3,13],coinRange:[53,106],expRange:[120,200],hp1:60,at1:8,df1:24,sp1:1,type:'boss',bossDialog:['\n　　　　　 ／￣￣＼\n　　　　／　　 _ノ　　＼\n　　　　|　　　 （ ●）（●）\n　　　　|　　　　 （__人__）\n　　　　 |　　　　　｀ ⌒´ﾉ\n  　　　　|　　　　　　 　 }'],floorRange:[105,9999],patterns:[{a:'enemycharge'},{a:'charge'},{a:'critical'},{a:'attack'},{a:'heal'},{a:'counter'}],weakness:13,bgm:'./BGM/battlebgm_yaranaio.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:23,name:'Queen Neki (Enhanced OP)',maxLv:5,drops:[6,3,23,7,15],coinRange:[80,133],expRange:[132,240],hp1:90,at1:9,df1:16,sp1:16,type:'boss',bossDialog:['"……(gazing down at you from on high)"'],floorRange:[105,9999],patterns:[{a:'enemyitem'},{a:'critical'},{a:'attack'},{a:'heal'},{a:'heal'},{a:'attack'},{a:'heal'}],weakness:6,bgm:'./BGM/battlebgm_queen.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:24,name:'King MonaSlime (Enhanced OP)',maxLv:5,drops:[3,3,19,24,19,0,47],coinRange:[80,120],expRange:[360,840],hp1:100,at1:10,df1:20,sp1:18,type:'boss',bossDialog:['"Monaaaa (thunderous voice)"'],floorRange:[105,9999],patterns:[{a:'charge'},{a:'charge'},{a:'critical'},{a:'heal'},{a:'enemycharge'},{a:'attack'},{a:'critical'}],weakness:19,bgm:'./BGM/battlebgm_king.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:25,name:'Berserker Yaruo (Enhanced OP)',maxLv:5,drops:[3,3,4,13,8,7,29],coinRange:[120,213],expRange:[93,143],hp1:70,at1:24,df1:10,sp1:14,type:'doubleboss',bossDialog:['\n　　　　　 　　　＿＿＿_\n　　　　　　　／::::::::::　 u＼\n　　　　 　／:::::::::⌒ 三. ⌒＼\n　　　　／:::::::::: （ ○）三（○）＼\n　　　　|::::::::::::::::⌒（__人__）⌒\n　 　　 ＼::::::::::　　 ｀ ⌒´ 　 ,／\n　　　　ノ::::::::::u 　　　　　　 　＼'],floorRange:[105,9999],patterns:[{a:'attack'},{a:'charge'},{a:'attack'},{a:'critical'}],weakness:12,bgm:'./BGM/battlebgm_speed.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0},
  {id:26,name:'Wandering OP',maxLv:3,drops:[53,51,52,1,1,1,1,1,2,2,2,2,3,3,4,5,6,6,6,7,8,9,50,10,10,10,11,12,13,14,14,14,15,16,16,17,18,18,18,19,20,21,21,22,49,22,23,24,25,26,27,28,47,29,30,31,32,34,35,36,36,36,37,38,39,42,43,44,45,46],coinRange:[100,500],expRange:[500,1000],hp1:99,at1:1,df1:9999,sp1:33,type:'undead',bossDialog:[`\n　　　　 （（（　）））\n　　～　（´Д｀；） GROSS!!\n～　　　/　つ _つ\n　～ 　人　 Ｙ\n　　 　し'（＿）`],floorRange:[51,9999],patterns:[{a:'run'}],weakness:19,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.01,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:27,name:'Giant Dog (OP)',maxLv:5,drops:[17,17,8],coinRange:[140,200],expRange:[165,345],hp1:60,at1:14,df1:12,sp1:4,type:'boss',bossDialog:['"WOOF! (thunderous bark)"'],floorRange:[35,35],patterns:[{a:'charge'},{a:'charge'},{a:'enemyguard'},{a:'critical'},{a:'counter'},{a:'attack'},{a:'enemycharge'}],weakness:12,bgm:'./BGM/battlebgm_animal.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0},
  {id:28,name:'Shobon',maxLv:3,drops:[5,22,42,42,43],coinRange:[10,30],expRange:[18,34],hp1:50,at1:10,df1:18,sp1:2,type:'normal',bossDialog:['(´・ω・`)'],floorRange:[21,9999],patterns:[{a:'counter'},{a:'attack'},{a:'heal'}],weakness:43,bgm:null,growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.15},
  {id:29,name:'Giant Dog (Enhanced OP)',maxLv:5,drops:[17,8],coinRange:[184,266],expRange:[220,456],hp1:90,at1:16,df1:24,sp1:2,type:'boss',bossDialog:['"WOOF! (thunderous bark)"'],floorRange:[105,9999],patterns:[{a:'charge'},{a:'charge'},{a:'enemyguard'},{a:'critical'},{a:'attack'},{a:'enemycharge'}],weakness:12,bgm:'./BGM/battlebgm_animal.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0},
  {id:30,name:'Buun Bird (OP)',maxLv:5,drops:[2,21,21,25,30,45],coinRange:[55,92],expRange:[92,165],hp1:40,at1:9,df1:1,sp1:20,type:'doubleboss',bossDialog:[`\n　　　　 　　／⌒ヽ\n　⊂二二二（　＾ω＾）二⊃\n　　　　　　|　　　 / 　　　　　　ﾌﾞｰﾝ\n　　 　　　 （　ヽノ\n　　　　　　 ﾉ>ノ\n　　 三　　レﾚ`],floorRange:[15,15],patterns:[{a:'critical'},{a:'enemyattack'},{a:'charge'},{a:'enemycharge'},{a:'critical'}],weakness:12,bgm:'./BGM/battlebgm_speed.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0},
  {id:31,name:'Buun Bird (Enhanced OP)',maxLv:5,drops:[3,21,25,30,31,45],coinRange:[83,122],expRange:[122,220],hp1:50,at1:16,df1:4,sp1:30,type:'doubleboss',bossDialog:[`\n　　　　 　　／⌒ヽ\n　⊂二二二（　＾ω＾）二⊃\n　　　　　　|　　　 / 　　　　　　ﾌﾞｰﾝ\n　　 　　　 （　ヽノ\n　　　　　　 ﾉ>ノ\n　　 三　　レﾚ`],floorRange:[105,9999],patterns:[{a:'critical'},{a:'enemycharge'},{a:'charge'},{a:'attack'},{a:'heal'}],weakness:12,bgm:'./BGM/battlebgm_speed.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.15},
  {id:32,name:'Metal Kuma (OP)',maxLv:5,drops:[53,13,20,8],coinRange:[100,300],expRange:[1500,4000],hp1:100,at1:20,df1:9999,sp1:60,type:'undeadboss',bossDialog:['\n　　 ∩＿＿＿∩\n　　 | ノ　　　　ヽ\n　　/　　●　　●|  Kuma──!!\n　 |　　　( _●_)　ミ\n　彡､　　 |∪|  ､｀＼\n/　＿＿  ヽノ\n´>　)\n(＿＿＿）　/  (_／\n　|　　　　/\n　|　 ／＼ ＼\n　| /　　  )  )\n　∪　　 （  ＼\n　　　　　 ＼＿)'],floorRange:[90,90],patterns:[{a:'enemyitem'},{a:'attack'},{a:'enemyguard'},{a:'critical'},{a:'attack'},{a:'attack'},{a:'counter'},{a:'enemyitem'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'heal'},{a:'selfdestruct'}],weakness:10,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.1,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:33,name:'Gold Kuma (OP)',maxLv:5,drops:[53,19,20,8],coinRange:[1000,3000],expRange:[150,400],hp1:120,at1:40,df1:9999,sp1:30,type:'doubleboss',bossDialog:['\n　　 ∩＿＿＿∩\n　　 | ノ　　　　ヽ\n　　/　　●　　●|  Kuma──!!\n　 |　　　( _●_)　ミ\n　彡､　　 |∪|  ､｀＼\n/　＿＿  ヽノ\n´>　)\n(＿＿＿）　/  (_／\n　|　　　　/\n　|　 ／＼ ＼\n　| /　　  )  )\n　∪　　 （  ＼\n　　　　　 ＼＿)'],floorRange:[95,95],patterns:[{a:'charge'},{a:'charge'},{a:'enemycharge'},{a:'enemyitem'},{a:'attack'},{a:'critical'},{a:'charge'},{a:'enemyguard'},{a:'attack'}],weakness:10,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.1,at:1.25,df:1.2,sp:1.1},healRate:0},
  {id:34,name:'Metal Dog',maxLv:3,drops:[18,17,13,24],coinRange:[12,36],expRange:[640,2000],hp1:18,at1:6,df1:9999,sp1:3,type:'normal',bossDialog:[],floorRange:[31,9999],patterns:[{a:'guard'},{a:'attack'},{a:'heal'},{a:'guard'},{a:'run'}],weakness:6,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1.01,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:35,name:'Anti-Dog',maxLv:3,drops:[18,17,13,6,6],coinRange:[16,56],expRange:[160,410],hp1:40,at1:16,df1:4,sp1:20,type:'normal',bossDialog:[],floorRange:[31,9999],patterns:[{a:'critical'},{a:'attack'},{a:'counter'},{a:'critical'},{a:'run'}],weakness:27,bgm:'./BGM/battlebgm_anti.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:36,name:'Neeno (Enhanced OP)',maxLv:5,drops:[8,25,35,24,19],coinRange:[30,60],expRange:[35,90],hp1:100,at1:30,df1:9999,sp1:30,type:'undeadboss',bossDialog:['\n　　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　Being a boss is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[105,9999],patterns:[{a:'enemyguard'},{a:'attack'},{a:'critical'},{a:'enemyitem'},{a:'enemycharge'},{a:'heal'},{a:'charge'},{a:'attack'},{a:'critical'},{a:'attack'},{a:'heal'},{a:'selfdestruct'}],weakness:6,bgm:'./BGM/battlebgm_daemon.ogg',growth:{hp:1.2,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:37,name:'Spiky\u2200',maxLv:1,drops:[10,14,1,42,42,43],coinRange:[2,6],expRange:[6,15],hp1:12,at1:1,df1:5,sp1:1,type:'normal',bossDialog:[],floorRange:[1,9],patterns:[{a:'counter'},{a:'attack'},{a:'counter'}],weakness:43,bgm:null,growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:38,name:'Unyielding Mona (OP)',maxLv:5,drops:[3,19,19,19,24,24,24,0,47],coinRange:[150,400],expRange:[200,550],hp1:120,at1:30,df1:9999,sp1:30,type:'undeadboss',bossDialog:[`\n　　　　　　　　　　　　　　　　　　　　*　。　+ 　* 　,\n　　　　　　　　　　　　　　　　　　　+　.ヽ　 l　　/ 。\n　　　　　　　　　　　　　　　　　　+ *　-　　　　　-　+\n　　　　　　　　　　　　　　　　　　　 n゜ +　 愛　*　゜ー\n　　　　　　　　　　　　　　　　　　　j　ヲ n __　　__ n\n　　　　　　　　　　　∧＿∧　　／／　 .i　≡　≧　ヽ　 　 ∧＿∧\n　　　　　　　　　　 （　´Д｀）／／　　／／∧. 　 ＼＼ 　（　´Д｀）\n　　　　　　　　　 ／　　　 　 ノ　　 ／／´Д｀）　　　ヽ、二　　　　 ,＼\n　　　　　　　　 ./　j　　　 　i　　　（　　　　　　 ＼　　　　　i　　　　i＼ヽ、\n　　　　　　　　（　( i 　 　 　|　　　 ＼ 　 　　 「＼二二つ　|　　 　 |　）　)\n　　　　　　　　 .＼＼ 　 　 .|　　　　　＼　　　＼　　　　　　＼ 　　と、／\n　　　　　　　 　　 'ヽ、_） 　.（　　　　　　 ）　　　　）　　　　　 　）　　） .））\n　　 　　　　　　　　 .＼　 ヽ ＼　　　　／ ／　／　　　　　　／ ／.|　|　　　　　　\n　　 　　　　　　 .　　　 ＞　.）　） 　 ／ ／　／ 　 　 　 　／ ／　 !|　|　　　　　\n　　　　　　　　　　　 ／　 ノ　ノ　 .（　（ 　< 　 　 　 　 ／ ／ 　 　.|　|　　　　\n　　　　　　　　　　 /　 ／ .／　　　 ＼＼ .＼　　　　 /　/ 　 　 　 |　|　　　 　　 \n　　　　　　　　　　 i__⌒)__⌒)　　　(⌒_(⌒__ヽ　　(⌒__ノ　　　 　(＿ノ`],floorRange:[75,75],patterns:[{a:'charge'},{a:'charge'},{a:'charge'},{a:'enemyguard'},{a:'critical'},{a:'enemyitem'},{a:'critical'},{a:'attack'},{a:'guard'},{a:'attack'},{a:'counter'},{a:'heal'},{a:'heal'},{a:'selfdestruct'}],weakness:10,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.1,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:39,name:'Flying Fish \u03c9',maxLv:3,drops:[1,1,2,25,10,42,42,43],coinRange:[8,24],expRange:[12,25],hp1:14,at1:6,df1:6,sp1:14,type:'normal',bossDialog:[],floorRange:[10,15],patterns:[{a:'enemyrun'},{a:'critical'},{a:'run'}],weakness:43,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:40,name:'Invincible Star',maxLv:3,drops:[32,24,42,43,0],coinRange:[120,300],expRange:[16,42],hp1:100,at1:6,df1:9999,sp1:16,type:'undead',bossDialog:[],floorRange:[16,50],patterns:[{a:'enemycharge'},{a:'charge'},{a:'charge'},{a:'attack'},{a:'run'}],weakness:43,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.01,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:41,name:'Robot \uff9fD\uff9f',maxLv:3,drops:[19,5,13,26,22,42,43],coinRange:[130,320],expRange:[18,52],hp1:17,at1:17,df1:9999,sp1:17,type:'undead',bossDialog:[],floorRange:[21,9999],patterns:[{a:'enemyguard'},{a:'critical'},{a:'charge'},{a:'charge'},{a:'attack'},{a:'critical'},{a:'selfdestruct'}],weakness:43,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.01,at:1.12,df:1.08,sp:1.05},healRate:0},
  {id:42,name:'Airship Buun (OP)',maxLv:5,drops:[51,3,3,21,25,31,0],coinRange:[65,100],expRange:[125,480],hp1:90,at1:9,df1:16,sp1:6,type:'boss',bossDialog:[`\n　　　　 　　／⌒ヽ\n　⊂二二二（　＾ω＾）二⊃\n　　　　　　|　　　 / 　　　　　　ﾌﾞｰﾝ\n　　 　　　 （　ヽノ\n　　　　　　 ﾉ>ノ\n　　 三　　レﾚ`],floorRange:[40,40],patterns:[{a:'counter'},{a:'guard'},{a:'enemycharge'},{a:'critical'},{a:'attack'},{a:'heal'},{a:'attack'}],weakness:9,bgm:'./BGM/battlebgm_speed.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:43,name:'Airship Buun (Enhanced OP)',maxLv:5,drops:[51,3,3,3,21,21,25,31,0],coinRange:[85,125],expRange:[130,485],hp1:100,at1:12,df1:30,sp1:8,type:'boss',bossDialog:[`\n　　　　 　　／⌒ヽ\n　⊂二二二（　＾ω＾）二⊃\n　　　　　　|　　　 / 　　　　　　ﾌﾞｰﾝ\n　　 　　　 （　ヽノ\n　　　　　　 ﾉ>ノ\n　　 三　　レﾚ`],floorRange:[105,9999],patterns:[{a:'attack'},{a:'counter'},{a:'enemycharge'},{a:'counter'},{a:'heal'},{a:'critical'},{a:'attack'},{a:'heal'}],weakness:9,bgm:'./BGM/battlebgm_speed.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:44,name:'Anti-Robot \uff9fD\uff9f (OP)',maxLv:5,drops:[19,5,4,26,23,6],coinRange:[140,360],expRange:[180,520],hp1:30,at1:20,df1:9999,sp1:24,type:'undeadboss',bossDialog:['(\uff9fD\uff9f)'],floorRange:[60,60],patterns:[{a:'enemyguard'},{a:'attack'},{a:'critical'},{a:'charge'},{a:'enemyguard'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'selfdestruct'}],weakness:27,bgm:'./BGM/battlebgm_horror.ogg',growth:{hp:1.1,at:1.25,df:1.2,sp:1.1},healRate:1},
  {id:45,name:'Anti-Robot \uff9fD\uff9f (Enhanced OP)',maxLv:5,drops:[19,8,4,26,7,27],coinRange:[160,400],expRange:[200,560],hp1:90,at1:30,df1:9999,sp1:30,type:'undeadboss',bossDialog:['(\uff9fD\uff9f)'],floorRange:[105,9999],patterns:[{a:'attack'},{a:'charge'},{a:'enemyguard'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'selfdestruct'}],weakness:33,bgm:'./BGM/battlebgm_horror.ogg',growth:{hp:1.2,at:1.25,df:1.2,sp:1.1},healRate:1},
  {id:46,name:'Swift Demon (Shadow OP)',maxLv:5,drops:[0,33,34,40,41],coinRange:[1000,3000],expRange:[1500,4000],hp1:199,at1:99,df1:9999,sp1:9999,type:'doubleboss',bossDialog:['"...(a shadow of its former prime)"'],floorRange:[200,220],patterns:[{a:'attack'},{a:'critical'},{a:'enemyitem'},{a:'charge'},{a:'attack'},{a:'enemyitem'},{a:'enemyguard'},{a:'attack'},{a:'heal'},{a:'enemyguard'},{a:'charge'},{a:'critical'},{a:'guard'},{a:'critical'},{a:'heal'},{a:'enemyitem'},{a:'critical'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'heal'},{a:'selfdestruct'}],weakness:27,bgm:'./BGM/battlebgm_irregular.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.25},
  {id:47,name:'Giko Hanyaan (OP)',maxLv:5,drops:[36,25,25,35,37,8],coinRange:[130,350],expRange:[170,500],hp1:40,at1:40,df1:12,sp1:24,type:'boss',bossDialog:['\n　　　　　　∧ ∧\n～′￣￣(,,゜Д゜)\n　UU￣￣　U U'],floorRange:[45,45],patterns:[{a:'critical'},{a:'counter'},{a:'attack'},{a:'guard'},{a:'enemycharge'},{a:'critical'},{a:'attack'},{a:'counter'}],weakness:37,bgm:'./BGM/battlebgm_animal.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:48,name:'Giko Hanyaan (Enhanced OP)',maxLv:5,drops:[25,25,35,8],coinRange:[130,350],expRange:[170,500],hp1:48,at1:48,df1:12,sp1:32,type:'boss',bossDialog:['\n　　　　　　∧ ∧\n～′￣￣(,,゜Д゜)\n　UU￣￣　U U'],floorRange:[105,9999],patterns:[{a:'critical'},{a:'counter'},{a:'attack'},{a:'heal'},{a:'enemycharge'},{a:'critical'},{a:'attack'},{a:'counter'}],weakness:37,bgm:'./BGM/battlebgm_animal.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:49,name:'Morara',maxLv:1,drops:[36,36,36,25,2,1,1,10,24,30],coinRange:[6,12],expRange:[9,21],hp1:14,at1:2,df1:8,sp1:1,type:'normal',bossDialog:['\n　 ∧＿∧\n　（　・∀・）'],floorRange:[3,10],patterns:[{a:'counter'},{a:'heal'},{a:'heal'}],weakness:10,bgm:'./BGM/battlebgm_mona.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:50,name:'Mini Giko',maxLv:3,drops:[36,36,36,36,36,25,25,25,35,37,8],coinRange:[13,35],expRange:[17,50],hp1:24,at1:20,df1:6,sp1:6,type:'normal',bossDialog:['\n　　　∧ ∧　\n　　 (,,・Д・) 　 ＿＿＿＿＿＿\n　～（＿__ノ'],floorRange:[45,90],patterns:[{a:'counter'},{a:'critical'},{a:'guard'},{a:'critical'},{a:'attack'},{a:'counter'}],weakness:37,bgm:null,growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:51,name:'Anti-Giko',maxLv:3,drops:[36,36,25,35,37,8,6],coinRange:[15,40],expRange:[20,60],hp1:32,at1:22,df1:8,sp1:16,type:'normal',bossDialog:[],floorRange:[91,9999],patterns:[{a:'attack'},{a:'critical'},{a:'attack'},{a:'counter'},{a:'attack'},{a:'counter'}],weakness:37,bgm:'./BGM/battlebgm_anti.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:52,name:'Demon Dog?? Zonu (OP)',maxLv:5,drops:[38,17,21],coinRange:[135,360],expRange:[175,520],hp1:90,at1:24,df1:18,sp1:3,type:'boss',bossDialog:['\n　　／￣￣￣￣＼\n　/　　　　 ●　　●、\n　|Y　　Y　　　　　　　＼\n　|.| 　 ｜　　　 　 　.▼ |\n　| ＼／ 　　 　 　 ＿人|\n　|　　　　　　 ＿＿＿／\n　＼　　　　／\n　　｜ ｜　|\n　　（_＿）＿）'],floorRange:[55,55],patterns:[{a:'counter'},{a:'counter'},{a:'heal'},{a:'critical'},{a:'attack'},{a:'critical'},{a:'attack'},{a:'attack'},{a:'heal'}],weakness:12,bgm:'./BGM/battlebgm_horror.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:53,name:'Demon Dog?? Zonu (Enhanced OP)',maxLv:5,drops:[38,17],coinRange:[140,370],expRange:[190,540],hp1:120,at1:30,df1:20,sp1:1,type:'boss',bossDialog:['\n　　／￣￣￣￣＼\n　/　　　　 ●　　●、\n　|Y　　Y　　　　　　　＼\n　|.| 　 ｜　　　 　 　.▼ |\n　| ＼／ 　　 　 　 ＿人|\n　|　　　　　　 ＿＿＿／\n　＼　　　　／\n　　｜ ｜　|\n　　（_＿）＿）'],floorRange:[105,9999],patterns:[{a:'counter'},{a:'enemycharge'},{a:'attack'},{a:'critical'},{a:'attack'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'counter'}],weakness:12,bgm:'./BGM/battlebgm_horror.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.5},
  {id:54,name:'Shii',maxLv:2,drops:[44,44,37,37,36,36,36,25],coinRange:[15,40],expRange:[20,36],hp1:28,at1:4,df1:16,sp1:1,type:'normal',bossDialog:['\n　　　　∧ ∧＿__　　\n　 　／(*゜ー゜)　／＼\n　／|￣∪∪￣|＼／\n　 　|　 　 　 　 |／\n　 　 ￣￣￣￣'],floorRange:[31,100],patterns:[{a:'guard'},{a:'enemycharge'},{a:'counter'},{a:'guard'},{a:'heal'}],weakness:37,bgm:'./BGM/battlebgm_si.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.5},
  {id:55,name:'Giko Hussar (OP)',maxLv:5,drops:[36,25,25,35,37,8],coinRange:[130,350],expRange:[170,500],hp1:40,at1:22,df1:40,sp1:8,type:'boss',bossDialog:['\n　　,,,,,,,,,,,,,,,∧,,∧\n～′,,,,,,,,,,ミ,,゜Д゜彡\n　UU"""" U U'],floorRange:[50,50],patterns:[{a:'counter'},{a:'counter'},{a:'attack'},{a:'critical'},{a:'enemycharge'},{a:'critical'},{a:'counter'},{a:'attack'}],weakness:37,bgm:'./BGM/battlebgm_animal.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:56,name:'Giko Hussar (Enhanced OP)',maxLv:5,drops:[25,25,35,8],coinRange:[130,350],expRange:[170,500],hp1:48,at1:30,df1:48,sp1:8,type:'boss',bossDialog:['\n　　,,,,,,,,,,,,,,,∧,,∧\n～′,,,,,,,,,,ミ,,゜Д゜彡\n　UU"""" U U'],floorRange:[105,9999],patterns:[{a:'counter'},{a:'attack'},{a:'counter'},{a:'attack'},{a:'critical'},{a:'enemycharge'},{a:'critical'},{a:'attack'},{a:'heal'}],weakness:37,bgm:'./BGM/battlebgm_animal.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:57,name:'I Dunno!',maxLv:2,drops:[43,45,36,36,25,10],coinRange:[12,36],expRange:[18,34],hp1:18,at1:8,df1:6,sp1:24,type:'normal',bossDialog:['\n　　 ∧ ∧　　 　　 ┌───────\n　　( ´ー｀)　　 　＜　I Dunno!\n　 　＼　< 　　　 　└───/|───\n　　　　＼.＼＿＿＿＿__／/\n　　　　　 ＼　　　　　／\n　　　　　　　∪∪￣∪∪'],floorRange:[16,30],patterns:[{a:'enemyitem'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'run'}],weakness:10,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:58,name:'Hikimon (OP)',maxLv:5,drops:[34,32,32,24,19],coinRange:[140,360],expRange:[180,520],hp1:50,at1:25,df1:9999,sp1:20,type:'undeadboss',bossDialog:['(\u30fbA\u30fb) W-Was self-directed all along!'],floorRange:[65,65],patterns:[{a:'enemyitem'},{a:'attack'},{a:'heal'},{a:'enemycharge'},{a:'critical'},{a:'attack'},{a:'counter'},{a:'heal'},{a:'selfdestruct'}],weakness:6,bgm:'./BGM/battlebgm_horror.ogg',growth:{hp:1.1,at:1.25,df:1.2,sp:1.1},healRate:0.3},
  {id:59,name:'Hikimon (Enhanced OP)',maxLv:5,drops:[34,32,24,19],coinRange:[145,370],expRange:[185,530],hp1:60,at1:28,df1:9999,sp1:24,type:'undeadboss',bossDialog:['(\u30fbA\u30fb) W-Was self-directed all along!'],floorRange:[105,9999],patterns:[{a:'enemyguard'},{a:'attack'},{a:'critical'},{a:'enemycharge'},{a:'attack'},{a:'critical'},{a:'attack'},{a:'heal'},{a:'selfdestruct'}],weakness:6,bgm:'./BGM/battlebgm_horror.ogg',growth:{hp:1.2,at:1.25,df:1.2,sp:1.1},healRate:1},
  {id:60,name:'Malara',maxLv:2,drops:[7,45,46,46,10,10,10,1,1,1,2,1,1,1,2],coinRange:[10,20],expRange:[7,27],hp1:10,at1:10,df1:5,sp1:15,type:'normal',bossDialog:['\n　 ／⌒＼\n　（　　　　）\n　｜　　 ｜ 　\n　｜　　 ｜\n　（　・∀・）\n　 ） つ　 つ\n　（＿_Ｙ＿）'],floorRange:[11,30],patterns:[{a:'critical'},{a:'charge'},{a:'attack'},{a:'critical'},{a:'heal'},{a:'selfdestruct'}],weakness:12,bgm:'./BGM/battlebgm_speed2.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:61,name:'Namechan',maxLv:1,drops:[46,42,6,6],coinRange:[12,24],expRange:[9,30],hp1:20,at1:8,df1:16,sp1:1,type:'normal',bossDialog:['\n　　λλ　　\n　／ ゜Д゜）\n　￣￣￣'],floorRange:[6,15],patterns:[{a:'counter'},{a:'enemycharge'},{a:'counter'},{a:'counter'},{a:'attack'}],weakness:46,bgm:null,growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:62,name:'Neeno (Action)',maxLv:3,drops:[2,3,3,8,25,25,36,35,24,24,19],coinRange:[15,40],expRange:[20,50],hp1:36,at1:20,df1:16,sp1:8,type:'double',bossDialog:['\n　　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　More actions is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[51,100],patterns:[{a:'enemyguard'},{a:'attack'},{a:'charge'},{a:'attack'},{a:'critical'},{a:'attack'}],weakness:10,bgm:'./BGM/battlebgm_neno.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:63,name:'Neeno (Undead)',maxLv:3,drops:[2,3,3,8,25,25,36,35,24,24,19],coinRange:[15,40],expRange:[20,50],hp1:60,at1:20,df1:9999,sp1:14,type:'undead',bossDialog:['\n　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　Being undead is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[31,50],patterns:[{a:'enemycharge'},{a:'attack'},{a:'charge'},{a:'charge'},{a:'critical'},{a:'attack'},{a:'enemyitem'},{a:'critical'},{a:'selfdestruct'}],weakness:10,bgm:'./BGM/battlebgm_neno.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:64,name:'Neeno (Fleeing)',maxLv:3,drops:[35,24,0],coinRange:[15,40],expRange:[20,50],hp1:100,at1:1,df1:1,sp1:24,type:'normal',bossDialog:['\n　　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　Running away is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[26,30],patterns:[{a:'run'}],weakness:19,bgm:'./BGM/battlebgm_rare.ogg',growth:{hp:1,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:65,name:'Neeno (Enhanced)',maxLv:3,drops:[3,3,8,25,25,35,24,19],coinRange:[20,45],expRange:[25,60],hp1:80,at1:25,df1:20,sp1:10,type:'double',bossDialog:['\n　　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　Getting stronger is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[101,9999],patterns:[{a:'attack'},{a:'enemyitem'},{a:'enemyguard'},{a:'attack'},{a:'attack'},{a:'attack'},{a:'enemycharge'},{a:'heal'}],weakness:19,bgm:'./BGM/battlebgm_neno.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:66,name:'Neeno (Offensive)',maxLv:3,drops:[2,2,3,8,10,25,36,36,35,24,24,19],coinRange:[15,40],expRange:[20,50],hp1:32,at1:20,df1:14,sp1:14,type:'normal',bossDialog:['\n　　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　Going on the offensive is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[16,25],patterns:[{a:'enemyguard'},{a:'attack'},{a:'critical'},{a:'attack'}],weakness:10,bgm:'./BGM/battlebgm_neno.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.3},
  {id:67,name:'Neeno (Defensive)',maxLv:3,drops:[2,2,3,8,10,25,36,36,35,24,24,19,28,28],coinRange:[15,40],expRange:[20,50],hp1:30,at1:5,df1:40,sp1:1,type:'normal',bossDialog:['\n　　.　λ＿λ　　／￣￣￣￣￣￣￣￣￣￣￣￣\n　　（　｀ー´）＜　Going full defense is fine too, Neeno?\n　　 /　　　　つ＼＿＿＿＿＿＿＿＿＿＿＿＿\n　　（人＿つ_つ'],floorRange:[6,15],patterns:[{a:'enemycharge'},{a:'guard'},{a:'counter'},{a:'counter'},{a:'heal'},{a:'guard'},{a:'counter'},{a:'attack'}],weakness:10,bgm:'./BGM/battlebgm_neno.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:68,name:'Unyielding Mona (Enhanced OP)',maxLv:5,drops:[19,19,19,24,24,0,47],coinRange:[150,400],expRange:[200,550],hp1:120,at1:40,df1:9999,sp1:30,type:'doubleboss',bossDialog:[`\n　　　　　　　　　　　　　　　　　　　　*　。　+ 　* 　,\n　　　　　　　　　　　　　　　　　　　+　.ヽ　 l　　/ 。\n　　　　　　　　　　　　　　　　　　+ *　-　　　　　-　+\n　　　　　　　　　　　　　　　　　　　 n゜ +　 愛　*　゜ー\n　　　　　　　　　　　　　　　　　　　j　ヲ n __　　__ n\n　　　　　　　　　　　∧＿∧　　／／　 .i　≡　≧　ヽ　 　 ∧＿∧\n　　　　　　　　　　 （　´Д｀）／／　　／／∧. 　 ＼＼ 　（　´Д｀）\n　　　　　　　　　 ／　　　 　 ノ　　 ／／´Д｀）　　　ヽ、二　　　　 ,＼\n　　　　　　　　 ./　j　　　 　i　　　（　　　　　　 ＼　　　　　i　　　　i＼ヽ、\n　　　　　　　　（　( i 　 　 　|　　　 ＼ 　 　　 「＼二二つ　|　　 　 |　）　)\n　　　　　　　　 .＼＼ 　 　 .|　　　　　＼　　　＼　　　　　　＼ 　　と、／\n　　　　　　　 　　 'ヽ、_） 　.（　　　　　　 ）　　　　）　　　　　 　）　　） .））\n　　 　　　　　　　　 .＼　 ヽ ＼　　　　／ ／　／　　　　　　／ ／.|　|　　　　　　\n　　 　　　　　　 .　　　 ＞　.）　） 　 ／ ／　／ 　 　 　 　／ ／　 !|　|　　　　　\n　　　　　　　　　　　 ／　 ノ　ノ　 .（　（ 　< 　 　 　 　 ／ ／ 　 　.|　|　　　　\n　　　　　　　　　　 /　 ／ .／　　　 ＼＼ .＼　　　　 /　/ 　 　 　 |　|　　　 　　 \n　　　　　　　　　　 i__⌒)__⌒)　　　(⌒_(⌒__ヽ　　(⌒__ノ　　　 　(＿ノ`],floorRange:[105,9999],patterns:[{a:'charge'},{a:'charge'},{a:'charge'},{a:'enemyguard'},{a:'critical'},{a:'enemyitem'},{a:'critical'},{a:'attack'},{a:'guard'},{a:'guard'},{a:'attack'},{a:'guard'},{a:'heal'},],weakness:10,bgm:'./BGM/battlebgm_king.ogg',growth:{hp:5,at:1.25,df:1.2,sp:1.1},healRate:0.2},
  {id:69,name:'Life Owata',maxLv:3,drops:[48,43,42,42,32,3,3,3,8,49],coinRange:[14,48],expRange:[36,64],hp1:66,at1:666,df1:6,sp1:6,type:'normal',bossDialog:['\\(^o^)/ OWATA'],floorRange:[81,9999],patterns:[{a:'counter'},{a:'guard'},{a:'attack'},{a:'guard'},{a:'attack'},{a:'counter'},{a:'attack'},{a:'heal'},{a:'selfdestruct'}],weakness:10,bgm:'./BGM/battlebgm_serious.ogg',growth:{hp:1.5,at:1.12,df:1.08,sp:1.05},healRate:0.2},
  {id:70,name:'Riceball Parade (OP)',maxLv:5,drops:[36,16,25,21],coinRange:[30,70],expRange:[35,120],hp1:42,at1:18,df1:12,sp1:16,type:'doubleboss',bossDialog:[`\n.　　　　　　+　　 ／■＼　　／■＼　 ／■＼　　+\n　　　　　　　　（　´∀｀∩（´∀｀∩）（　´∀｀）\n　　　+　　（(　（つ　　　ノ（つ　　丿（つ　　つ　)）　　+\n　　　　　　　　 ヽ　 （　ノ　（　ヽノ　　）　）　）\n　　　　　　　　　（＿）し'　し（＿）　（＿）＿）`],floorRange:[10,10],patterns:[{a:'charge'},{a:'charge'},{a:'attack'},{a:'enemycharge'},{a:'critical'},{a:'attack'},{a:'guard'},{a:'attack'},{a:'heal'},{a:'charge'},{a:'attack'}],weakness:15,bgm:'./BGM/battlebgm_normal2.ogg',growth:{hp:4,at:1.25,df:1.2,sp:1.1},healRate:0.15},
];

const MIMIC_DATA = {
  id:99,name:'Mimic PFFT!',maxLv:3,drops:[1,1,1,1,2,2,3,10,19,7],coinRange:[25,100],expRange:[30,150],
  hp1:10,at1:12,df1:9999,sp1:30,type:'mimic',bossDialog:['m9(^Д^)ﾌﾟｷﾞｬｰ'],
  patterns:[{a:'enemyitem'},{a:'attack'},{a:'attack'},{a:'enemycharge'},{a:'attack'}],
  weakness:19,bgm:'./BGM/battlebgm_irregular.ogg',growth:{hp:1.01,at:1.12,df:1.08,sp:1.05},healRate:0
};
 
const NPC_DATA = [
  {id:0,name:'Fallen User',events:[
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','…? There’s a small pouch nearby that looks like the deceased’s belongings.']],'coin',5],
    [[['NPC','……。'],['PLAYER','...No response. It’s just a corpse.'],['PLAYER','...? There’s a small object nearby that looks like it belonged to the deceased.']],'item',1],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','…? There’s a small pouch nearby that looks like the deceased’s belongings.']],'coin',15],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','…? There’s a small pouch nearby that looks like the deceased’s belongings.']],'coin',25],
    [[['NPC','……。'],['PLAYER','...No response. It’s just a corpse.'],['PLAYER','...? There’s a small object nearby that looks like it belonged to the deceased.']],'item',2],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','…? There’s a small pouch nearby that looks like the deceased’s belongings.']],'coin',50],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','…？。There is a note nearby.']],'item',6],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','…? There’s a small pouch nearby that looks like the deceased’s belongings.']],'coin',100],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','...? There’s a cracked PC monitor lying nearby.']],'item',12],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','...? A small, faintly glowing object is lying nearby.']],'item',19],
    [[['NPC','……。'],['PLAYER','…No response… It’s just a corpse.'],['PLAYER','...? There’s a small object nearby that looks like it belonged to the deceased.']],'item',0],
  ]},
  {id:1,name:'Explorer Bro',events:[
    [[['NPC','I can’t continue exploring because my inventory is full…'],['NPC','...? Hey, you there!\nCould you hold onto these items for me?'],['PLAYER','I have no intention of giving them back, but I decided to hold onto the items.']],'item',2],
    [[['NPC','We meet again!\nThanks to you holding onto those items earlier, I was able to keep exploring.'],['NPC','This is a token of my thanks from back then.'],['PLAYER','I guess doing a good deed once in a while (?) isn’t so bad.']],'item',3],
  ]},
  {id:2,name:'Onigiri-Distributing Old Man',events:[
    [[['NPC','These onigiri were carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
    [[['NPC','Today’s onigiri were also carefully made with my own hands.'],['PLAYER','You receive a mysterious onigiri of unknown origin...']],'item',21],
  ]},
  {id:3,name:'Expert Bro',events:[
    [[['NPC','Oh? Are you an explorer too? Judging by the look of you, you’re still quite a beginner.'],['NPC','Let me tell you something useful. Apparently every monster you encounter has a fixed behavior pattern.'],['NPC','If you use Search to check their actions and weaknesses—or memorize them—clearing the dungeon will become much easier.']],'',0],
    [[['NPC','We meet again. Are you enjoying the exploration?'],['NPC','If you don’t have a particular goal, you should try aiming for floor 100 or deeper.'],['NPC','Rumor has it that bosses appearing after floor 100 can drop legendary weapons.']],'',0],
    [[['NPC','We meet again. Having trouble with repeated runs?'],['NPC','Actually, if you have a Mona Decoy Doll from around floor 25 onward—you can avoid a total loss.'],['NPC','You can get it from treasure chests, shops, or as a drop from King MonaSlime, so try aiming for it with Lucky Tea.']],'',0],
    [[['NPC','We meet again. Are enemies faster than you giving you trouble?'],['NPC','If the enemy is faster, they act first—and there’s also a 20% chance they’ll act twice.'],['NPC','You should either level up, or use items to manipulate the speed relationship.']],'',0],
    [[['NPC','We meet again. Are strong enemies giving you trouble?'],['NPC','In that case, try using weakness items that are effective against each enemy.'],['NPC','Weakness items deal double effect. You can identify them with Search, so figure out the best strategy.']],'',0],
    [[['NPC','We meet again. Are you struggling against immortal enemies?'],['NPC','Immortal enemies are completely unaffected by anything except their weakness items.'],['NPC','Use Search to find their weakness items and discover the key to defeating them.']],'',0],
    [[['NPC','We meet again. Have you encountered enemies that only run away?'],['NPC','Enemies that run away sometimes have good drops. Especially “Wandering OP”, who is basically a mystery box that can drop almost any item at random.'],['NPC','Early on it’s nearly impossible to defeat them because of the speed difference, but if you keep doing runs with a Mona Decoy Doll, you’ll eventually be able to take them down.']],'',0],
  ]},
  {id:4,name:'Injured Doggo',events:[
    [[['NPC','Whine... (It’s lying down, looking in pain.)'],['PLAYER','...Even if it’s a monster, I feel bad for it. I should treat its wounds.\n(I used some items I had on hand to give first aid.)'],['NPC','Woof... (It stood up and came closer, but soon left the area afterward.)']],'',0],
    [[['NPC','Woof!'],['PLAYER','The doggo I helped before approaches while carrying something in its mouth.'],['PLAYER','Maybe it’s giving this to me as thanks.']],'item',17],
  ]},
  {id:5,name:'Anonymous Investor',events:[
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
    [[['NPC','Oh? An explorer, I see. I’ll exchange one Shiny MonaCoin for every ten Old MonaCoins you have.']],'monaconvert',0],
  ]},
  {id:6,name:'Anonymous Priest',events:[
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
    [[['NPC','...You seem injured. Let me heal you.']],'allheal',0],
  ]},
  {id:7,name:'【PR】Sign Bro',events:[
    [[['PLAYER','There is a person standing silently in front of you, holding a sign...'],['PLAYER',`The sign describes "Tool Workshop," which operates various web tools and services.`],['NPC',`Sign guide: <a href="https:\/\/hayadebi.github.io/Accounting-ai-app/" target="_blank" alt="Hayadebi's Tool Workshop">Enter the Tool Workshop</a>`]],'',0],
  ]},
];
 
const SHOP_KEEPER_DIALOGS = [
  ['　 　　　＿＿＿_\n　　　／　　 　 　＼ （ ;;;;(\n　 ／　　＿ノ　 ヽ__＼) ;;;;)\n|　　　　（─） 　（─ /;;／\n|　 　　 　 （__人__） l;;,\'',
   '... (Silently staring at you.)','... (Bows their head.)','... (Bows their head.)'],
];
 
const EXPLORE_TEXTS = {
  descend:['You step into B{floor}.'],
  explore:['You searched for treasure, but couldn’t find anything.','Thick grass grows here. Perhaps this used to be an entertaining thread.','You found a fishing spot. A dried-up thread user is lying nearby. Maybe they took the bait.','You found a sign. It reads: "Take it easy!"','You pause and listen carefully. From somewhere far away, you hear a voice going "Buun."'],
  treasure:['You tried desk-slamming, and it made a hole—something was hidden inside.','A little further ahead, you noticed something shining.','Among the trash posts and copypasta, you found some treasure.','Something was rolling near your feet. Taking a closer look, it turned out to be treasure.'],
  monster:['From the darkness ahead, you hear a low growl.','Suddenly, the shadow ahead moved!','You felt someone staring at you...!','An enemy noticed your footsteps and is approaching.'],
  npc:['You see a figure ahead. It doesn’t seem to be an enemy.','Someone is sitting down in the shadow of the wall.','A person is standing just beyond the corner.'],
  shop:['In a slightly open area, a refuge thread had been set up.','For some reason, a shop was open inside the dungeon.','You hear a voice saying "Welcome!" and look toward the direction it came from...'],
  stairs:['At the end of a long corridor, you see stairs leading downward.','Looks like a checkpoint. There are stairs leading further ahead.'],
  winComment:['　n ∧＿∧\n(ﾖ（´∀｀　） Good!!','　＊　　　　　＋\n＋　　n ∧＿∧　 n\n＋　(ﾖ（* ´∀｀）E)\n 　  Y 　　Y','　 ∧＿∧ +\n（　・∀・）\n（　　つ旦\n｜ ｜ |'],
  loseComment:['Orz...','I’m doomed ＼(^o^)／','It’s hopeless...'],
  levelUp:['LEVEL UP ｷﾀ━(ﾟ∀ﾟ)━ｯ!!'],
  battleCheer:['You can do it!','Go for it!','Feels like it has a pattern.'],
};
 
const ANON_NAMES = ['Anonymous','Explorer-chan','Veteran Explorer','Dungeon Regular','Guild Apprentice','Nameless One'];
 
/* =====================================================
   SECTION 2: STATE MANAGEMENT
   ===================================================== */
 //playBGM('gameover',null);
const AUDIO_CONFIG = {
  defaultBgm:{explore:'./BGM/dungeonbgm.ogg',normal:'./BGM/battlebgm_normal.ogg',boss:'./BGM/battlebgm_boss.ogg',gameover:'./SE/Come_back_to_me.ogg'},
  sfx:{attack:'./SE/spell1.ogg',playerHit:'./SE/hit3.ogg',enemyHit:'./SE/hit3.ogg',levelup:'./SE/Bonus4.ogg',item:null,treasure:null,gameover:'./SE/Come_back_to_me.ogg',run:'./SE/run1.ogg',victory:'./SE/eff13.ogg',buy:'./SE/get2.ogg',stairs:null,miss:'./SE/missing1.ogg',plate:null},
};
 
const SAVE_KEY = 'dungeon_bbs_v2';
const DEFAULT_STATE = {
  explorerName:'',lv:1,exp:0,coins:0,hp:50,maxHp:50,at:12,df:8,sp:12,items:[],
  achievements:{kills:{},maxFloor:0,itemSeen:[],monsterSeen:[]},
  floor:0,npcProgress:{},hiddenGrowth:{hp:0,at:0,df:0,sp:0},
  threadId:generateThreadId(),logCount:0,
};
 
let GS=null,currentFloorEvents=[],currentEventIdx=0,battleState=null;
 
function generateThreadId(){
  const c='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let r='';for(let i=0;i<10;i++)r+=c[Math.floor(Math.random()*c.length)];return r;
}
function loadState(){try{const s=localStorage.getItem(SAVE_KEY);if(!s)return null;return JSON.parse(s);}catch(e){return null;}}
function saveState(){if(!GS)return;try{localStorage.setItem(SAVE_KEY,JSON.stringify(GS));}catch(e){}}
function saveFloorEvents(){try{localStorage.setItem(SAVE_KEY+'_floor',JSON.stringify({events:currentFloorEvents,idx:currentEventIdx}));}catch(e){}}
function loadFloorEvents(){try{const s=localStorage.getItem(SAVE_KEY+'_floor');if(!s)return null;return JSON.parse(s);}catch(e){return null;}}
function expRequired(lv){return Math.floor(100*Math.pow(1.17,lv-1));}
function getBaseMaxHp(lv){return 50+(lv-1)*10+GS.hiddenGrowth.hp;}
function getBaseAt(lv){return 12+Math.floor((lv-1)*1.8)+GS.hiddenGrowth.at;}
function getBaseDf(lv){return 8+Math.floor((lv-1)*1.2)+GS.hiddenGrowth.df;}
function getBaseSp(lv){return 10+Math.floor((lv-1)*1.0)+GS.hiddenGrowth.sp;}
 
function gainExp(amount){
  GS.exp+=amount;let leveled=false;
  while(GS.lv<255&&GS.exp>=expRequired(GS.lv)){
    GS.exp-=expRequired(GS.lv);GS.lv++;
    const newMaxHp=getBaseMaxHp(GS.lv);
    GS.hp=Math.min(GS.hp+(newMaxHp-GS.maxHp),newMaxHp);GS.maxHp=newMaxHp;
    GS.at=getBaseAt(GS.lv);GS.df=getBaseDf(GS.lv);GS.sp=getBaseSp(GS.lv);leveled=true;
  }
  if(GS.lv>=255)GS.exp=0;return leveled;
}
function initNewState(name){
  const hg={hp:Math.floor(Math.random()*10),at:Math.floor(Math.random()*3),df:Math.floor(Math.random()*3),sp:Math.floor(Math.random()*3)};
  const state=JSON.parse(JSON.stringify(DEFAULT_STATE));
  state.explorerName=name;state.hiddenGrowth=hg;
  state.maxHp=50+hg.hp;state.hp=state.maxHp;
  state.at=12+hg.at;state.df=8+hg.df;state.sp=10+hg.sp;
  state.floor=0;state.threadId=generateThreadId();return state;
}
 
/* =====================================================
   SECTION 3: AUDIO SYSTEM
   ===================================================== */
 
let audioCtx=null,bgmAudio=null,bgmInterval=null,bgmNoteIdx=0,currentBgmUid=null,bgmNodes=[];
const BGM_PATTERNS={
  explore:{notes:[261,293,329,349,329,293,261,246],dur:[0.4,0.4,0.4,0.8,0.4,0.4,0.4,0.8],wave:'sine',vol:0.12},
  normal:{notes:[220,246,261,220,195,220,246,261,293,261],dur:[0.25,0.25,0.25,0.5,0.25,0.25,0.25,0.25,0.5,0.5],wave:'square',vol:0.08},
  boss:{notes:[110,116,123,110,98,110,116,123,138,123],dur:[0.5,0.25,0.25,0.5,1.0,0.5,0.25,0.25,0.5,1.0],wave:'sawtooth',vol:0.06}
};
function getAudioCtx(){if(!audioCtx){try{audioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){return null;}}if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx;}
function getBgmVol(){return parseInt(document.getElementById('bgmVol').value)/100;}
function getSfxVol(){return parseInt(document.getElementById('sfxVol').value)/100;}
function stopBGM(){if(bgmAudio){bgmAudio.pause();bgmAudio.src='';bgmAudio=null;}if(bgmInterval){clearTimeout(bgmInterval);bgmInterval=null;}bgmNodes.forEach(n=>{try{n.stop();}catch(e){}});bgmNodes=[];currentBgmUid=null;}
function playBGM(typeKey,url){
  const resolvedUrl=url||AUDIO_CONFIG.defaultBgm[typeKey]||null;
  const uid=resolvedUrl||typeKey;
  if(currentBgmUid===uid)return;
  stopBGM();currentBgmUid=uid;
  if(resolvedUrl){try{bgmAudio=new Audio(resolvedUrl);bgmAudio.loop=true;bgmAudio.volume=getBgmVol();bgmAudio.play().catch(()=>{bgmAudio=null;});}catch(e){bgmAudio=null;}}
  else{_playProceduralBGM(typeKey);}
}
function _playProceduralBGM(type){
  const pat=BGM_PATTERNS[type];if(!pat)return;bgmNoteIdx=0;
  function playNext(){
    if(currentBgmUid!==type)return;const ctx=getAudioCtx();if(!ctx)return;
    const freq=pat.notes[bgmNoteIdx%pat.notes.length];const dur=pat.dur[bgmNoteIdx%pat.dur.length];const vol=pat.vol*getBgmVol();
    if(vol>0){try{const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type=pat.wave;osc.frequency.value=freq;gain.gain.setValueAtTime(vol,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur*0.9);osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+dur);bgmNodes.push(osc);}catch(e){}}
    bgmNoteIdx++;bgmInterval=setTimeout(playNext,dur*1000);
  }
  playNext();
}
function playSFX(type){
  const url=AUDIO_CONFIG.sfx[type]||null;
  if(url){try{const a=new Audio(url);a.volume=getSfxVol();a.play().catch(()=>{});}catch(e){}return;}
  _playSFXProcedural(type);
}
function _playSFXProcedural(type){
  const ctx=getAudioCtx();if(!ctx)return;const vol=getSfxVol();if(vol===0)return;const now=ctx.currentTime;
  function tone(f,d,w,v){try{const o=ctx.createOscillator();const g=ctx.createGain();o.type=w||'sine';o.frequency.value=f;g.gain.setValueAtTime(v*vol,now);g.gain.exponentialRampToValueAtTime(0.0001,now+d);o.connect(g);g.connect(ctx.destination);o.start(now);o.stop(now+d);}catch(e){}}
  function toneAt(t,f,d,w,v){try{const o=ctx.createOscillator();const g=ctx.createGain();o.type=w||'sine';o.frequency.value=f;g.gain.setValueAtTime(v*vol,now+t);g.gain.exponentialRampToValueAtTime(0.0001,now+t+d);o.connect(g);g.connect(ctx.destination);o.start(now+t);o.stop(now+t+d);}catch(e){}}
  switch(type){
    case 'attack':tone(300,0.1,'square',0.3);toneAt(0.08,220,0.15,'square',0.2);break;
    case 'playerHit':tone(180,0.15,'sawtooth',0.25);break;
    case 'enemyHit':tone(350,0.08,'square',0.2);toneAt(0.05,250,0.1,'square',0.15);break;
    case 'levelup':toneAt(0,523,0.15,'sine',0.3);toneAt(0.15,659,0.15,'sine',0.3);toneAt(0.3,784,0.15,'sine',0.3);toneAt(0.45,1047,0.3,'sine',0.4);break;
    case 'item':tone(600,0.08,'sine',0.2);toneAt(0.08,800,0.12,'sine',0.15);break;
    case 'treasure':tone(523,0.1,'sine',0.2);toneAt(0.1,659,0.1,'sine',0.2);toneAt(0.2,784,0.15,'sine',0.25);break;
    case 'gameover':toneAt(0,220,0.4,'sawtooth',0.3);toneAt(0.4,196,0.4,'sawtooth',0.3);toneAt(0.8,174,0.6,'sawtooth',0.35);break;
    case 'run':tone(400,0.05,'square',0.15);toneAt(0.06,300,0.1,'square',0.1);break;
    case 'victory':toneAt(0,523,0.1,'square',0.2);toneAt(0.1,659,0.1,'square',0.2);toneAt(0.2,784,0.1,'square',0.2);toneAt(0.3,1047,0.25,'square',0.25);break;
    case 'buy':tone(700,0.1,'sine',0.2);toneAt(0.1,900,0.15,'sine',0.15);break;
    case 'stairs':toneAt(0,400,0.15,'sine',0.2);toneAt(0.15,500,0.15,'sine',0.2);toneAt(0.3,600,0.2,'sine',0.25);break;
    case 'miss':tone(200,0.1,'square',0.1);break;
    default:tone(440,0.05,'sine',0.1);break;
  }
}
 
/* =====================================================
   SECTION 4: LOG SYSTEM
   ===================================================== */
 
let logQueue=[],logProcessing=false,logCommentNum=1,commandsLocked=true;
function addLog(user,text,style,delay,userType){logQueue.push({type:'log',user,text,style:style||'',delay:delay||1000,userType:userType||'anon'});if(!logProcessing)_processQueue();}
function addCmd(commands){logQueue.push({type:'cmd',commands});if(!logProcessing)_processQueue();}
function addCallback(fn){logQueue.push({type:'cb',fn});if(!logProcessing)_processQueue();}
function _processQueue(){
  if(logQueue.length===0){logProcessing=false;return;}
  logProcessing=true;const item=logQueue.shift();
  if(item.type==='log'){setTimeout(()=>{_renderLog(item);_processQueue();},item.delay);}
  else if(item.type==='cmd'){_showCommands(item.commands);logProcessing=false;}
  else if(item.type==='cb'){item.fn();_processQueue();}
}
function _renderLog(item){
  const container=document.getElementById('logContainer');
  const div=document.createElement('div');div.className='log-comment';
  const metaDiv=document.createElement('div');metaDiv.className='log-meta';
  const numStr='No.'+String(logCommentNum).padStart(3,'0');
  GS.logCount=logCommentNum;logCommentNum++;
  let nc='';if(item.userType==='player')nc='is-player';else if(item.userType==='npc')nc='is-npc';else if(item.userType==='enemy')nc='is-enemy';else if(item.userType==='system')nc='is-system';
  metaDiv.innerHTML='<span class="log-num">'+numStr+'</span> Name：<span class="log-name '+nc+'">'+escHtml(item.user)+'</span> <span style="font-size:0.62rem;">'+getBoardDate()+'</span>';
  div.appendChild(metaDiv);
  const bodyDiv=document.createElement('div');bodyDiv.className='log-body'+(item.style?' log-'+item.style:'');
  if(item.userType==='npc'||item.userType==='system'){
    bodyDiv.innerHTML=item.text.replace(/\n/g,'<br>');
  }else{
    bodyDiv.textContent=item.text;
  }
  div.appendChild(bodyDiv);container.appendChild(div);container.scrollTop=container.scrollHeight;
}
function _showCommands(commands){
  commandsLocked=false;const grid=document.getElementById('cmdGrid');grid.innerHTML='';
  const label=document.querySelector('.cmd-label');if(label)label.textContent='▼ Please select a command';
  commands.forEach(cmd=>{
    const btn=document.createElement('button');btn.className='cmd-btn'+(cmd.danger?' cmd-danger':'');btn.textContent=cmd.label;if(cmd.disabled)btn.disabled=true;
    btn.onclick=()=>{if(commandsLocked)return;commandsLocked=true;grid.innerHTML='';cmd.action();};grid.appendChild(btn);
  });
}
function clearCommands(){document.getElementById('cmdGrid').innerHTML='';commandsLocked=true;}
function getBoardDate(){const d=new Date();const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];return d.getFullYear()+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+String(d.getDate()).padStart(2,'0')+'('+days[d.getDay()]+') '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')+':'+String(d.getSeconds()).padStart(2,'0');}
function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function randFrom(arr){return arr[Math.floor(Math.random()*arr.length)];}
function randInt(min,max){return min+Math.floor(Math.random()*(max-min+1));}
 
/* =====================================================
   SECTION 5: UI UPDATES
   ===================================================== */
 
function updateStatus(){
  if(!GS)return;
  document.getElementById('s-floor').textContent='B'+GS.floor;document.getElementById('s-name').textContent=GS.explorerName;document.getElementById('s-lv').textContent=GS.lv;
  const req=expRequired(GS.lv);document.getElementById('s-exp').textContent=GS.exp+'/'+req;document.getElementById('s-expbar').style.width=Math.min(100,Math.floor(GS.exp/req*100))+'%';
  document.getElementById('s-coins').textContent=GS.coins;
  const hpEl=document.getElementById('s-hp');hpEl.textContent=GS.hp+'/'+GS.maxHp;hpEl.className='stat-val hp-val'+(GS.hp<=GS.maxHp*0.25?' hp-low':'');
  document.getElementById('s-at').textContent=GS.at;document.getElementById('s-df').textContent=GS.df;document.getElementById('s-sp').textContent=GS.sp;
  _updateBattlePlayerStats();
}
function _updateBattlePlayerStats(){
  if(!GS)return;
  const n=document.getElementById('bps-name');if(n)n.textContent=GS.explorerName;
  const lv=document.getElementById('bps-lv');if(lv)lv.textContent=GS.lv;
  const hp=document.getElementById('bps-hp');if(hp){hp.textContent=GS.hp+'/'+GS.maxHp;hp.className='bps-val '+(GS.hp<=GS.maxHp*0.25?'bps-hp-low':'bps-hp');}
  const co=document.getElementById('bps-coins');if(co)co.textContent=GS.coins;
  const at=document.getElementById('bps-at');if(at)at.textContent=GS.at;
  const df=document.getElementById('bps-df');if(df)df.textContent=GS.df;
  const sp=document.getElementById('bps-sp');if(sp)sp.textContent=GS.sp;
  const req=expRequired(GS.lv);const ex=document.getElementById('bps-exp');if(ex)ex.textContent=GS.exp+'/'+req;
}
function updateInventory(){
  if(!GS)return;const list=document.getElementById('invList');
  if(GS.items.length===0){list.innerHTML='<div class="inv-empty">No items</div>';return;}
  const counts={};GS.items.forEach(id=>{counts[id]=(counts[id]||0)+1;});
  const shown=[];list.innerHTML='';
  Object.keys(counts).forEach(id=>{
    if(shown.includes(id))return;shown.push(id);const item=ITEM_DATA[parseInt(id)];if(!item)return;
    const div=document.createElement('div');div.className='inv-item';
    div.innerHTML='<span>'+escHtml(item.name)+'</span><span class="item-count">'+counts[id]+'</span>';
    div.onclick=()=>showItemPopup(parseInt(id));list.appendChild(div);
  });
}
function updateAchievements(){
  if(!GS)return;const ach=GS.achievements;const list=document.getElementById('achList');
  const totalKills=Object.values(ach.kills).reduce((a,b)=>a+b,0);
  const monsterPct=MONSTER_DATA.length>0?Math.floor(ach.monsterSeen.length/MONSTER_DATA.length*100):0;
  const itemPct=ITEM_DATA.length>0?Math.floor(ach.itemSeen.length/ITEM_DATA.length*100):0;
  list.innerHTML='<div class="ach-row"><span>Deepest Floor</span><span class="ach-val">B'+ach.maxFloor+'</span></div><div class="ach-row"><span>Total Kills</span><span class="ach-val">'+totalKills+'</span></div><div class="ach-row"><span>Monster Codex</span><span class="ach-val">'+monsterPct+'%</span></div><div class="ach-row"><span>Item Codex</span><span class="ach-val">'+itemPct+'%</span></div>';
}
function showItemPopup(itemId,inBattle,onUse){
  const item=ITEM_DATA[itemId];if(!item)return;
  document.getElementById('ipName').textContent=item.name;document.getElementById('ipDesc').textContent=item.desc;
  const typeLabel=item.type==='use'?'Use':'Collection';
  let detailTxt='Type: '+typeLabel+'　Price: '+item.price+'MC';
  if(item.type==='use'&&item.stat){const eff=item.effect>0?'+'+item.effect:item.effect;detailTxt+='\nEffect: '+item.stat.toUpperCase()+' '+eff+'　Target: '+(item.target==='self'?'Self':'Enemy');}
  document.getElementById('ipDetail').textContent=detailTxt;
  const popup=document.getElementById('itemPopup');popup.classList.remove('hidden');
  const existingUseBtn=popup.querySelector('.use-in-battle');if(existingUseBtn)existingUseBtn.remove();
  if(inBattle&&item.type==='use'&&onUse){
    const useBtn=document.createElement('button');useBtn.className='btn-gold use-in-battle';useBtn.textContent='▶ Use this item';
    useBtn.onclick=()=>{popup.classList.add('hidden');onUse(itemId);};popup.querySelector('.modal-box').appendChild(useBtn);
  }
}
function setThreadTitle(){document.getElementById('threadTitle').textContent='【Floor:B'+GS.floor+'】'+GS.threadId+'【Thread Dungeon】';}
 
/* =====================================================
   SECTION 6: FLOOR & EVENT GENERATION
   ===================================================== */
 
function isUndead(type){return type==='undead'||type==='undeadboss';}
function isDouble(type){return type==='double'||type==='doubleboss';}
function isBossLike(type){return type==='boss'||type==='doubleboss'||type==='undeadboss';}
 
function getMonstersForFloor(floorNum,isBoss){
  return MONSTER_DATA.filter(m=>{
    const bt=isBossLike(m.type);
    if(isBoss)return bt&&m.floorRange[0]<=floorNum&&m.floorRange[1]>=floorNum;
    return !bt&&m.floorRange[0]<=floorNum&&m.floorRange[1]>=floorNum;
  });
}
function getMonsterForFloor(floorNum){const pool=getMonstersForFloor(floorNum,false);if(pool.length===0)return MONSTER_DATA[0];return randFrom(pool);}
function getBossForFloor(floorNum){const pool=getMonstersForFloor(floorNum,true);if(pool.length===0){const fb=getMonstersForFloor(floorNum,false);return fb.length>0?fb[fb.length-1]:MONSTER_DATA[0];}return randFrom(pool);}
function weightedRandEvent(){const w={treasure:25,monster:50,npc:13,shop:12};const total=Object.values(w).reduce((a,b)=>a+b,0);let r=Math.random()*total;for(const[k,v]of Object.entries(w)){r-=v;if(r<=0)return k;}return 'monster';}
function generateFloorEvents(floorNum){
  const isBoss=floorNum%5===0;const numEvents=randInt(3,5);const events=[];
  for(let i=0;i<numEvents;i++){
    const type=weightedRandEvent();
    if(type==='monster'){const m=getMonsterForFloor(floorNum);const monLv=Math.max(1,randInt(0,m.maxLv)+floorNum);events.push({type:'monster',monsterId:m.id,monsterLv:monLv});}
    else if(type==='npc'){events.push({type:'npc',npcId:randInt(0,NPC_DATA.length-1)});}
    else if(type==='shop'){events.push({type:'shop'});}
    else{events.push({type:'treasure'});}
  }
  if(isBoss){const boss=getBossForFloor(floorNum);const bossLv=Math.max(1,randInt(0,boss.maxLv)+floorNum);events.push({type:'boss',monsterId:boss.id,monsterLv:bossLv});}
  events.push({type:'stairs'});return events;
}
function getItemsForFloor(floorNum){return ITEM_DATA.filter(it=>it.minFloor<=floorNum&&it.maxFloor>=floorNum);}
function getShopItems(floorNum){const pool=getItemsForFloor(floorNum);if(pool.length===0)return ITEM_DATA.slice(1,4);const shuffled=[...pool].sort(()=>Math.random()-0.5);return shuffled.slice(0,Math.min(3,shuffled.length));}
 
/* =====================================================
   SECTION 7: DAMAGE CALCULATION
   ===================================================== */
 
function calcDamage(at,df){const base=(at*at)/(at+Math.max(1,df*0.6));return Math.max(1,Math.floor(base*(0.85+Math.random()*0.3)));}
const STAGE_MULTS=[0.25,0.28,0.33,0.4,0.5,0.67,1.0,1.5,2.0,2.5,3.0,3.5,4.0];
function stageAt(base,stage){return Math.max(1,Math.floor(base*STAGE_MULTS[Math.min(12,Math.max(0,6+stage))]));}
function getMonsterStats(monster,lv){
  return {name:monster.name,lv,id:monster.id,
    maxHp:Math.max(1,monster.hp1+Math.floor(lv*monster.growth.hp)),hp:Math.max(1,monster.hp1+Math.floor(lv*monster.growth.hp)),
    at:Math.max(1,monster.at1+Math.floor(lv*monster.growth.at)),df:Math.max(1,monster.df1+Math.floor(lv*monster.growth.df)),sp:Math.max(1,monster.sp1+Math.floor(lv*monster.growth.sp)),
    patterns:monster.patterns,weakness:monster.weakness,healRate:monster.healRate,drops:monster.drops||[],coinRange:monster.coinRange,expRange:monster.expRange,bossDialog:monster.bossDialog||[],type:monster.type,bgm:monster.bgm};
}
 
/* =====================================================
   SECTION 8: BATTLE SYSTEM
   ===================================================== */
 
let bLog=[],bProcessing=false,bQueue=[];
function bAddLog(text,cls,delay){bQueue.push({text,cls:cls||'',delay:delay||500});if(!bProcessing)_processBQueue();}
function bAddCmd(commands){bQueue.push({type:'cmd',commands});if(!bProcessing)_processBQueue();}
function bAddCb(fn){bQueue.push({type:'cb',fn});if(!bProcessing)_processBQueue();}
function _processBQueue(){
  if(bQueue.length===0){bProcessing=false;return;}bProcessing=true;const item=bQueue.shift();
  if(item.type==='cmd'){_showBattleCmds(item.commands);bProcessing=false;}
  else if(item.type==='cb'){item.fn();_processBQueue();}
  else{setTimeout(()=>{_renderBLog(item.text,item.cls);_processBQueue();},item.delay);}
}
function _renderBLog(text,cls){
  const log=document.getElementById('battleLog');const atBottom=log.scrollHeight-log.scrollTop-log.clientHeight<40;
  String(text).split('\n').forEach((line,i)=>{const div=document.createElement('div');div.className='battle-log-line'+(cls?' bl-'+cls:'');div.textContent=line;if(i>0)div.style.paddingLeft='0.8em';log.appendChild(div);});
  if(atBottom)log.scrollTop=log.scrollHeight;
}
function _showBattleCmds(commands){
  const cmds=document.getElementById('battleCmds');cmds.innerHTML='';
  commands.forEach(cmd=>{const btn=document.createElement('button');btn.className='cmd-btn'+(cmd.danger?' cmd-danger':'');btn.textContent=cmd.label;if(cmd.disabled)btn.disabled=true;btn.onclick=()=>{if(cmd.disabled)return;cmds.innerHTML='';cmd.action();};cmds.appendChild(btn);});
}
function clearBattleCmds(){document.getElementById('battleCmds').innerHTML='';document.getElementById('battleItemList').style.display='none';}
function updateEnemyHpBar(){if(!battleState)return;const pct=Math.max(0,battleState.enemy.hp/battleState.enemy.maxHp*100);document.getElementById('enemyHpBar').style.width=pct+'%';document.getElementById('enemyHpText').textContent='HP: '+Math.max(0,battleState.enemy.hp)+'/'+battleState.enemy.maxHp;}
 
function startBattle(monsterData,isBoss,onWin,onLose){
  const enemy=getMonsterStats(monsterData,monsterData.lv||(GS.floor+1));
  if(!GS.achievements.monsterSeen.includes(enemy.id))GS.achievements.monsterSeen.push(enemy.id);
  battleState={
    enemy,isBoss,playerAt:GS.at,playerDf:GS.df,playerSp:GS.sp,
    playerAtStage:0,playerDfStage:0,enemyAtStage:0,enemyDfStage:0,enemySpStage:0,
    enemyChargeCount:0,chargeCount:0,actionCount:0,enemyPatternIdx:0,
    lastPlayerCmd:null,lastPlayerAttackdmg:0,guardThisTurn:false,
    enemyGuardThisTurn:false,enemyActedThisTurn:false,guaranteedDrop:false,
    turn:1,onWin,onLose,
  };
  playBGM(isBoss?'boss':'normal',enemy.bgm);
  document.getElementById('battleModal').classList.remove('hidden');
  document.getElementById('battleTitle').textContent=isBoss?'⚔ OP Battle ⚔':'⚔ Battle ⚔';
  document.getElementById('enemyName').textContent=enemy.name+' (Lv.'+enemy.lv+')';
  document.getElementById('enemyStats').textContent='AT:'+enemy.at+' DF:'+enemy.df+' SP:'+enemy.sp;
  document.getElementById('battleLog').innerHTML='';
  updateEnemyHpBar();_updateBattlePlayerStats();
  if(enemy.bossDialog.length>0){enemy.bossDialog.forEach((line,i)=>{bAddLog('【'+enemy.name+'】'+line,i===0?'red':'',800);});}
  const plateCount=GS.items.filter(x=>x===24).length;
  if(plateCount>=100){const bs=battleState;bs.chargeCount+=100;bAddLog('The goodwill sealed within the Mona Plates triggers a miracle!','gold',400);playSFX('plate');bAddLog(GS.explorerName+' is empowered by the strength of unity! ('+bs.chargeCount+' stacks)','gold',800);}
  if(isUndead(enemy.type)){bAddLog('[WARNING] '+enemy.name+' possesses an undead body! Normal attacks and most items are ineffective! Use weakness items!','red',600);}
  if(isDouble(enemy.type)){bAddLog('[WARNING] '+enemy.name+' strikes many times! It will always act twice!','red',600);}
  const eSp=stageAt(enemy.sp,battleState.enemySpStage);
  if(eSp>GS.sp){bAddLog(enemy.name+' is faster! The enemy acts first!','red',600);bAddCb(()=>enemyTurn(()=>showPlayerCmds()));}
  else{bAddLog('Battle start! Choose your action.','gold',500);bAddCb(()=>showPlayerCmds());}
}
 
function showPlayerCmds(){
  if(!battleState)return;const bs=battleState;
  bs.actionCount=0;bs.enemyGuardThisTurn=false;bs.enemyActedThisTurn=false;
  if(peekEnemyAction(bs,0)==='guard'){consumeEnemyAction(bs);bs.enemyGuardThisTurn=true;bs.enemyActedThisTurn=true;}
  const hasUseItems=GS.items.some(id=>ITEM_DATA[id]&&ITEM_DATA[id].type==='use');
  const lastCmd=bs.lastPlayerCmd;
  bAddCmd([
    {label:'⚔ ATTACK',disabled:lastCmd==='enemyattack',action:()=>playerAttack()},
    {label:'💪 CHARGE',disabled:lastCmd==='enemycharge',action:()=>playerCharge()},
    {label:'🛡 GUARD'+(lastCmd==='guard'?' [CT]':''),disabled:(lastCmd==='guard'||lastCmd==='enemyguard'),action:()=>playerGuard()},
    {label:'🎒 ITEM',disabled:(!hasUseItems||lastCmd==='enemyitem'),action:()=>playerItem()},
    {label:'🔍 SEARCH',disabled:lastCmd==='enemysearch',action:()=>playerSearch()},
    {label:'💨 ESCAPE',disabled:lastCmd==='enemyrun',danger:true,action:()=>playerRun()},
  ]);
}
 
// ★ BUG FIX: 2回行動ロジックを afterPlayerAction に集約
// 従来の実装は bs.enemyActedThisTurn=true の場合のみ2回行動チェックを行い、
// false の場合は直接 enemyTurn を呼ぶだけで2回行動チェックをスキップしていた。
// 修正: checkDouble コールバックを共通化し、enemyTurn の next に渡す。
function afterPlayerAction(nextCallback,isAttack){
  const bs=battleState;if(!bs)return;
  // ★ 2回行動チェック関数: enemyTurn 完了後に呼ばれ、条件を満たせば再度 enemyTurn を呼ぶ
  const checkDouble=()=>{
    const curEnemySp=stageAt(bs.enemy.sp,bs.enemySpStage);
    const shouldDouble=isDouble(bs.enemy.type)||(curEnemySp>GS.sp&&Math.random()<0.2);
    if(shouldDouble&&bs.actionCount<2){bAddCb(()=>enemyTurn(nextCallback||showPlayerCmds));}
    else{bAddCb(nextCallback||showPlayerCmds);}
  };
  if(bs.enemyActedThisTurn){
    // 敵が先行ガード済み → ガードログを出してから2回行動チェック
    if(!isAttack&&bs.enemyGuardThisTurn){bAddLog(bs.enemy.name+' was guarding, but no attack came.','gray',400);}
    bs.enemyGuardThisTurn=false;bs.enemyActedThisTurn=false;
    checkDouble();
  } else {
    // 通常: 1回目の enemyTurn → 完了後 checkDouble で2回目を判定
    bAddCb(()=>enemyTurn(checkDouble));
  }
}
 
function playerAttack(){
  if(!battleState)return;const bs=battleState;
  if(bs.lastPlayerCmd==='enemyattack'){bAddLog('Your attack is sealed this turn!','red',300);bAddCb(()=>showPlayerCmds());return;}
  bs.lastPlayerCmd='attack';
  const atBoost=Math.pow(1.5,bs.chargeCount);const effAt=Math.floor(stageAt(bs.playerAt,bs.playerAtStage)*atBoost);bs.chargeCount=0;
  if(bs.enemyGuardThisTurn){
    playSFX('miss');bAddLog(GS.explorerName+' attacks! '+bs.enemy.name+' was guarding! Damage 0!','gray',400);
    afterPlayerAction(showPlayerCmds,true);
  } else if(isUndead(bs.enemy.type)){
    bs.lastPlayerAttackdmg=0;
    playSFX('miss');bAddLog(GS.explorerName+' attacks! But it has no effect on '+bs.enemy.name+'’s undead body! Damage 0!','gray',400);
    afterPlayerAction(showPlayerCmds,true);
  } else {
    const effDf=stageAt(bs.enemy.df,bs.enemyDfStage);const dmg=calcDamage(effAt,effDf);bs.lastPlayerAttackdmg=dmg;bs.enemy.hp-=dmg;playSFX('enemyHit');bAddLog(GS.explorerName+' attacks! '+dmg+' damage to '+bs.enemy.name+'!','gold',400);updateEnemyHpBar();if(bs.enemy.hp<=0){bAddCb(()=>battleVictory());}else{afterPlayerAction(showPlayerCmds,true);}
  }
}
function playerCharge(){
  if(!battleState)return;const bs=battleState;
  if(bs.lastPlayerCmd==='enemycharge'){bAddLog('Your charge is sealed this turn!','red',300);bAddCb(()=>showPlayerCmds());return;}
  bs.lastPlayerCmd='charge';bs.lastPlayerAttackdmg=0;bs.chargeCount++;
  bAddLog(GS.explorerName+' charged up! ('+bs.chargeCount+' stacks)','gold',400);afterPlayerAction(showPlayerCmds);
}
function playerGuard(){
  if(!battleState)return;const bs=battleState;
  if(bs.lastPlayerCmd==='guard'){bAddLog('Guard cannot be used consecutively!','red',300);bAddCb(()=>showPlayerCmds());return;}
  if(bs.lastPlayerCmd==='enemyguard'){bAddLog('Guard is sealed this turn!','red',300);bAddCb(()=>showPlayerCmds());return;}
  bs.lastPlayerCmd='guard';bs.lastPlayerAttackdmg=0;bs.guardThisTurn=true;
  bAddLog(GS.explorerName+' takes a guarding stance. All damage this turn will be reduced to 0!','',400);
  afterPlayerAction(()=>{bs.guardThisTurn=false;showPlayerCmds();});
}
function playerItem(){
  if(!battleState)return;const bs=battleState;
  if(bs.lastPlayerCmd==='enemyitem'){bAddLog('Item use is sealed this turn!','red',300);bAddCb(()=>showPlayerCmds());return;}
  const prevCmd=bs.lastPlayerCmd;
  bs.lastPlayerCmd='item';bs.lastPlayerAttackdmg=0;
  const itemList=document.getElementById('battleItemList');itemList.style.display='flex';itemList.innerHTML='';
  const useItems=GS.items.filter((id,i,arr)=>arr.indexOf(id)===i&&ITEM_DATA[id]&&ITEM_DATA[id].type==='use');
  if(useItems.length===0){bAddLog('No usable items.','gray',300);bAddCb(()=>showPlayerCmds());return;}
  const cancelBtn=document.createElement('button');cancelBtn.className='cmd-btn';cancelBtn.textContent='Cancel';cancelBtn.onclick=()=>{bs.lastPlayerCmd=prevCmd;itemList.style.display='none';showPlayerCmds();};itemList.appendChild(cancelBtn);
  useItems.forEach(id=>{
    const item=ITEM_DATA[id];const count=GS.items.filter(x=>x===id).length;const btn=document.createElement('button');btn.className='cmd-btn';btn.textContent=item.name+' ×'+count;
    btn.onclick=()=>{
      showItemPopup(id,true,(usedId)=>{
        itemList.style.display='none';useItemInBattle(usedId);
      });
    };
    itemList.appendChild(btn);
  });
}
 
function useItemInBattle(itemId){
  if(!battleState)return;const bs=battleState;const item=ITEM_DATA[itemId];
  if(!item||item.type!=='use'){showPlayerCmds();return;}
  const idx=GS.items.indexOf(itemId);if(idx<0){showPlayerCmds();return;}
  let eff=item.effect,stat=item.stat,target=item.target;
  if(stat!=='nousedhp'){GS.items.splice(idx,1);updateInventory();playSFX('item');}
  if(!GS.achievements.itemSeen.includes(itemId))GS.achievements.itemSeen.push(itemId);
  if(bs.enemyGuardThisTurn&&item.target==='enemy'){
    playSFX('miss');bAddLog(GS.explorerName+' used '+item.name+'! But '+bs.enemy.name+' was guarding and deflected it!','gray',500);
    afterPlayerAction(showPlayerCmds);return;
  }
  if(bs.enemy.weakness===itemId){eff*=2;}
  const enemyIsUndead=isUndead(bs.enemy.type);
  if(enemyIsUndead&&bs.enemy.weakness!==itemId){
    const affectsEnemy=(target==='enemy'||stat==='custom2'||stat==='nousedhp');
    if(affectsEnemy){bAddLog(GS.explorerName+' used '+item.name+'! But it was repelled by '+bs.enemy.name+'’s undead body!','gray',500);afterPlayerAction(showPlayerCmds);return;}
  }
  if(stat==='random'){
    const statChoices=['hp','hp','hp','at','sp','df','exp'];stat=randFrom(statChoices);target=Math.random()<0.55?'self':'enemy';
    eff=Math.round((Math.random()-Math.random())*100);if(eff===0)eff=Math.random()<0.5?1:-1;
    bAddLog(GS.explorerName+' used '+item.name+'! A mysterious effect is triggered...','',400);
    if(enemyIsUndead&&target==='enemy'){bAddLog('It was repelled by '+bs.enemy.name+'’s undead body!','gray',300);afterPlayerAction(showPlayerCmds);return;}
  }
  if(stat==='lucky'){bs.guaranteedDrop=true;bAddLog(GS.explorerName+' used '+item.name+'! If you win the battle, an item might drop...!','gray',500);updateStatus();afterPlayerAction(showPlayerCmds);return;}
  if(eff===0){bAddLog(GS.explorerName+' used '+item.name+'. But nothing happened.','gray',500);afterPlayerAction(showPlayerCmds);return;}
  if(stat==='custom1'){
    GS.hp=Math.min(GS.maxHp,GS.hp+30);bs.playerSp=Math.max(-10,Math.min(10,bs.playerSp+1));bs.playerDfStage=Math.max(-10,Math.min(10,bs.playerDfStage+1));
    bAddLog(GS.explorerName+' used '+item.name+'! HP +30 recovered, and SP & DF increased by 1 stage!','green',500);updateStatus();
  } else if(stat==='custom2'){
    const dmg=30;bs.lastPlayerAttackdmg=dmg;bs.enemy.hp-=dmg;bs.playerSp=Math.max(-10,Math.min(10,bs.playerSp+1));bs.playerAtStage=Math.max(-10,Math.min(10,bs.playerAtStage+1));
    bAddLog(GS.explorerName+' used '+item.name+'! '+bs.enemy.name+' took 30 damage, and SP & AT increased by 1 stage!','green',500);
    updateStatus();updateEnemyHpBar();if(bs.enemy.hp<=0){bAddCb(()=>battleVictory());return;}
  } else if(stat==='custom3'){
    GS.hp=Math.min(GS.maxHp,GS.hp+9999);bs.playerSp=Math.max(-10,Math.min(10,bs.playerSp+2));bs.playerAtStage=Math.max(-10,Math.min(10,bs.playerAtStage+2));bs.playerDfStage=Math.max(-10,Math.min(10,bs.playerDfStage+2));
    bAddLog(GS.explorerName+' used '+item.name+'! HP fully recovered and all stats increased by 2 stages!','green',500);updateStatus();
  } else if(stat==='hp'||stat==='nousedhp'){
    if(target==='self'){const heal=Math.min(eff,GS.maxHp-GS.hp);GS.hp=Math.min(GS.maxHp,GS.hp+eff);const lbl=item.stat==='random'?'[Random Effect] HP'+(eff>0?'+'+heal:heal)+'!':'HP'+(heal>0?'+'+heal:heal)+'!';bAddLog(GS.explorerName+' used '+item.name+'! '+lbl,'green',500);updateStatus();}
    else{const dmg=Math.abs(eff);bs.lastPlayerAttackdmg=dmg;bs.enemy.hp-=dmg;const lbl=item.stat==='random'?'[Random Effect] '+bs.enemy.name+' took '+dmg+' damage!':bs.enemy.name+' took '+dmg+' damage!';bAddLog(GS.explorerName+' used '+item.name+'! '+lbl,'gold',500);updateEnemyHpBar();if(bs.enemy.hp<=0){bAddCb(()=>battleVictory());return;}}
  } else if(stat==='exp'){
    const leveled=gainExp(eff);const lbl=item.stat==='random'?'[Random Effect] EXP'+(eff>0?'+'+eff:eff)+'!':'EXP'+(eff>0?'+'+eff:eff)+'!';
    bAddLog(GS.explorerName+' used '+item.name+'! '+lbl,'green',500);if(leveled)bAddLog('Level Up! Reached LV.'+GS.lv+'!','gold',600);updateStatus();
  } else if(['at','df','sp'].includes(stat)){
    const stage=eff;const stageDir=stage>0?'increased':'decreased';const stageAbs=Math.abs(stage);
    if(target==='self'){
      if(stat==='at')bs.playerAtStage=Math.max(-10,Math.min(10,bs.playerAtStage+stage));
      else if(stat==='sp')bs.playerSp=Math.max(-10,Math.min(10,bs.playerSp+stage));
      else if(stat==='df')bs.playerDfStage=Math.max(-10,Math.min(10,bs.playerDfStage+stage));
      const lbl=item.stat==='random'?'[Random Effect] '+stat.toUpperCase()+' '+stageDir+'!':stat.toUpperCase()+' '+stageDir+' by '+stageAbs+' stage(s)!';
      bAddLog(GS.explorerName+' used '+item.name+'! '+lbl,'green',500);
    } else {
      if(stat==='df')bs.enemyDfStage=Math.max(-10,Math.min(10,bs.enemyDfStage+stage));
      else if(stat==='sp')bs.enemySpStage=Math.max(-10,Math.min(10,bs.enemySpStage+stage));
      else if(stat==='at')bs.enemyAtStage=Math.max(-10,Math.min(10,bs.enemyAtStage+stage));
      const lbl=item.stat==='random'?'[Random Effect] '+bs.enemy.name+'’s '+stat.toUpperCase()+' '+stageDir+'!':bs.enemy.name+'’s '+stat.toUpperCase()+' '+stageAbs+' stage(s) '+stageDir+'!';
      bAddLog(lbl,'red',500);
    }
    updateStatus();
  }
  afterPlayerAction(showPlayerCmds);
}

function playerSearch(){
  if(!battleState)return;const bs=battleState;
  if(bs.lastPlayerCmd==='enemysearch'){bAddLog('Search is sealed this turn!','red',300);bAddCb(()=>showPlayerCmds());return;}
  bs.lastPlayerCmd='search';bs.lastPlayerAttackdmg=0;
  const wItem=bs.enemy.weakness>=0?ITEM_DATA[bs.enemy.weakness]:null;
  const undeadNote=isUndead(bs.enemy.type)?'\n[Undead Type] Normal attacks ineffective · Only weakness items work':'';
  const doubleNote=isDouble(bs.enemy.type)?'\n[Action Type] Always acts twice':'';
  bAddLog('Search!\nWeakness Item: '+(wItem?wItem.name:'None')+undeadNote+doubleNote,'',500);
  const actionNames={attack:'Attack',charge:'Charge',guard:'Guard',heal:'Heal',run:'Run',counter:'Counter',enemyguard:'Guard Seal',enemyattack:'Attack Seal',enemyrun:'Run Seal',enemysearch:'Search Seal',enemyitem:'Item Seal',enemycharge:'Charge Seal',critical:'Critical Strike',selfdestruct:'Self-Destruct'};
  const next2=actionNames[peekEnemyAction(bs,1)]||peekEnemyAction(bs,1);
  bAddLog('Next enemy action: ['+next2+']','',600);afterPlayerAction(showPlayerCmds);
}

function playerRun(){
  if(!battleState)return;const bs=battleState;
  if(bs.lastPlayerCmd==='enemyrun'){bAddLog('Running away is sealed this turn!','red',300);bAddCb(()=>showPlayerCmds());return;}
  bs.lastPlayerCmd='run';bs.lastPlayerAttackdmg=0;
  const dmg=calcDamage(stageAt(bs.enemy.at,bs.enemyAtStage),stageAt(GS.df,bs.playerDfStage));
  GS.hp=Math.max(0,GS.hp-dmg);playSFX('run');
  if(bs.isBoss){
    bAddLog(GS.explorerName+' tried to run! But '+bs.enemy.name+' blocked the way! '+dmg+' damage!','red',500);updateStatus();
    if(GS.hp<=0){bAddCb(()=>checkPlayerDead(false));}
    else{bAddCb(()=>{const modal=document.getElementById('battleModal');modal.classList.add('hidden');setTimeout(()=>{modal.classList.remove('hidden');bAddLog('There is no escape... You must fight!','red',400);bAddCb(()=>showPlayerCmds());},600);});}
  } else {
    bAddLog(GS.explorerName+' fled! But was struck by '+bs.enemy.name+'! '+dmg+' damage!','red',500);updateStatus();
    if(GS.hp<=0){bAddCb(()=>checkPlayerDead(true));}else{bAddCb(()=>battleEnd(false,true));}
  }
}
 
function peekEnemyAction(bs,offset){return bs.enemy.patterns[(bs.enemyPatternIdx+offset)%bs.enemy.patterns.length].a;}
function consumeEnemyAction(bs){const action=bs.enemy.patterns[bs.enemyPatternIdx%bs.enemy.patterns.length].a;bs.enemyPatternIdx=(bs.enemyPatternIdx+1)%bs.enemy.patterns.length;return action;}
 
function enemyTurn(next){
  if(!battleState){if(next)next();return;}const bs=battleState;bs.actionCount++;
  if(bs.enemy.hp<=0){battleVictory();return;}if(GS.hp<=0){checkPlayerDead(false);return;}
  const action=consumeEnemyAction(bs);
  if(action==='attack'){
    const atBoost=Math.pow(1.5,bs.enemyChargeCount);
    const suteIdx=GS.items.indexOf(32);const hasSute=suteIdx>=0;
    if(bs.guardThisTurn){
      bs.enemyChargeCount=0;bAddLog(bs.enemy.name+' attacks! But '+GS.explorerName+' guarded! Damage 0!','',500);playSFX('miss');
    } else if(hasSute&&calcDamage(Math.floor(stageAt(bs.enemy.at,bs.enemyAtStage)*atBoost),stageAt(GS.df,bs.playerDfStage))>=20){
      bs.enemyChargeCount=0;bAddLog(bs.enemy.name+' attacks! But '+GS.explorerName+' used a throwaway account as a decoy! One throwaway account was consumed and damage 0!','',500);playSFX('miss');GS.items.splice(suteIdx,1);updateInventory();
    } else {
      const at=Math.floor(stageAt(bs.enemy.at,bs.enemyAtStage)*atBoost);bs.enemyChargeCount=0;
      const dmg=calcDamage(at,stageAt(GS.df,bs.playerDfStage));GS.hp=Math.max(0,GS.hp-dmg);playSFX('playerHit');
      bAddLog(bs.enemy.name+' attacks! '+dmg+' damage to '+GS.explorerName+'!'+(atBoost>1?' (Charge ×'+atBoost.toFixed(2)+')':''),'red',500);updateStatus();
    }
    if(GS.hp<=0){bAddCb(()=>checkPlayerDead(false));return;}
    } else if(action==='charge'){
      bs.enemyChargeCount++;bAddLog(bs.enemy.name+' charged! ('+bs.enemyChargeCount+' stacks)','red',400);
    } else if(action==='guard'){
      bAddLog(bs.enemy.name+' takes a guarding stance. Attacks this turn will be nullified!','',400);bs.enemyGuardThisTurn=true;bs.enemyActedThisTurn=true;
    } else if(action==='heal'){
      if(bs.enemy.healRate>0){const healAmt=Math.floor(bs.enemy.maxHp*bs.enemy.healRate);bs.enemy.hp=Math.min(bs.enemy.maxHp,bs.enemy.hp+healAmt);bAddLog(bs.enemy.name+' recovered '+healAmt+' HP!','red',400);updateEnemyHpBar();}
      else{bAddLog(bs.enemy.name+' tried to heal... but nothing happened.','gray',400);}
    } else if(action==='run'){
      bAddLog(bs.enemy.name+' ran away!','gray',400);bAddCb(()=>battleEnd(false,false,false,null,true));return;
    } else if(action==='selfdestruct'){
      const selfDmg=Math.floor(bs.enemy.hp);
      let removeDmg = selfDmg+' damage to '+GS.explorerName+'!';
      if(bs.guardThisTurn){
        bs.enemy.hp/=2;
        removeDmg = GS.explorerName+' guarded, but '+selfDmg+' damage pierced through...!';
      }
      bs.enemy.hp=0;
      updateEnemyHpBar();
      GS.hp=Math.max(0,GS.hp-selfDmg);playSFX('playerHit');updateStatus();
      bAddLog(bs.enemy.name+' self-destructed!!! '+removeDmg,'red',600);
      if(GS.hp<=0){bAddCb(()=>checkPlayerDead(false));return;}
      bAddCb(()=>battleVictory());return;
    } else if(action==='enemyguard'){bs.lastPlayerCmd=action;bAddLog(bs.enemy.name+' used Guard Seal! '+GS.explorerName+' cannot guard for 1 turn...!','',400);}
    else if(action==='enemyattack'){bs.lastPlayerCmd=action;bAddLog(bs.enemy.name+' used Attack Seal! '+GS.explorerName+' cannot attack for 1 turn...!','',400);}
    else if(action==='enemyrun'){bs.lastPlayerCmd=action;bAddLog(bs.enemy.name+' used Run Seal! '+GS.explorerName+' cannot run away for 1 turn...!','',400);}
    else if(action==='enemysearch'){bs.lastPlayerCmd=action;bAddLog(bs.enemy.name+' used Search Seal! '+GS.explorerName+' cannot search for 1 turn...!','',400);}
    else if(action==='enemyitem'){bs.lastPlayerCmd=action;bAddLog(bs.enemy.name+' used Item Seal! '+GS.explorerName+' cannot use items for 1 turn...!','',400);}
    else if(action==='enemycharge'){bs.chargeCount=0;bs.lastPlayerCmd=action;bAddLog(bs.enemy.name+' used Charge Seal! '+GS.explorerName+' cannot charge for 1 turn, and stored charge power was reset...!','',400);}
    else if(action==='counter'){
      if(bs.lastPlayerAttackdmg>0){const lastdmg=Math.abs(bs.lastPlayerAttackdmg*2);GS.hp=Math.max(0,GS.hp-lastdmg);playSFX('playerHit');bAddLog(bs.enemy.name+' countered! '+lastdmg+' damage returned to '+GS.explorerName+'!','red',500);updateStatus();}
      else{bAddLog(bs.enemy.name+' prepared a counter... but nothing happened.','gray',400);}
      if(GS.hp<=0){bAddCb(()=>checkPlayerDead(false));return;}
    } else if(action==='critical'){
      if(bs.guardThisTurn){bs.enemyChargeCount=0;bAddLog(bs.enemy.name+' used a critical strike! But '+GS.explorerName+' guarded! Damage 0!','',500);playSFX('miss');}
      else{
        const atBoost=Math.pow(1.5,bs.enemyChargeCount);const at=Math.floor(stageAt(bs.enemy.at,bs.enemyAtStage)*atBoost);bs.enemyChargeCount=0;
        const dmg=calcDamage(at,stageAt(GS.df,bs.playerDfStage));
        if(Math.random()<0.3){const maxdmg=dmg*2;GS.hp=Math.max(0,GS.hp-maxdmg);bAddLog(bs.enemy.name+' critical strike! Direct hit on a vital point! '+maxdmg+' damage to '+GS.explorerName+'!'+(atBoost>1?' (Charge ×'+atBoost.toFixed(2)+')':''),'red',500);}
        else{const mindmg=Math.floor(dmg/1.2);GS.hp=Math.max(0,GS.hp-mindmg);bAddLog(bs.enemy.name+' critical strike! The vital point was missed, but '+mindmg+' damage to '+GS.explorerName+'!'+(atBoost>1?' (Charge ×'+atBoost.toFixed(2)+')':''),'red',500);}
        playSFX('playerHit');updateStatus();
      }
    if(GS.hp<=0){bAddCb(()=>checkPlayerDead(false));return;}
  }
  bAddCb(next||showPlayerCmds);
}
 
function checkPlayerDead(fromRun){
  const dollIdx=GS.items.indexOf(0);
  if(dollIdx>=0){GS.items=GS.items.filter(id=>id!==0);playSFX('item');bAddLog('The Mona Decoy Doll shattered! Game Over avoided! Reviving with 1 HP!','gold',600);GS.hp=1;GS.floor=1;saveState();updateStatus();bAddCb(()=>battleEnd(false,false,true));}
  else{playBGM(null,null);playSFX('gameover');bAddLog(GS.explorerName+' has fallen...','red',700);bAddCb(()=>battleEnd(true,false,false));}
}

function battleVictory(){
  if(!battleState)return;const bs=battleState;playSFX('victory');
  const coins=randInt(Math.floor(Math.max(1,bs.enemy.lv*0.8)*bs.enemy.coinRange[0]),Math.floor(Math.max(1,bs.enemy.lv*0.8)+bs.enemy.coinRange[1]));
  const exp=randInt(Math.floor(Math.max(1,bs.enemy.lv*0.8)*bs.enemy.expRange[0]),Math.floor(Math.max(1,bs.enemy.lv*0.8)+bs.enemy.expRange[1]));
  GS.coins+=coins;
  let droppedItem=null;
  // ★ doubleboss/undeadboss are also treated as bosses with a 60% drop rate
  const bossLike=isBossLike(bs.enemy.type);
  if(bs.enemy.drops.length>0&&(bs.guaranteedDrop||(!bossLike&&Math.random()<0.3)||(bossLike&&Math.random()<0.6))){droppedItem=randFrom(bs.enemy.drops);GS.items.push(droppedItem);if(!GS.achievements.itemSeen.includes(droppedItem))GS.achievements.itemSeen.push(droppedItem);}
  GS.achievements.kills[bs.enemy.id]=(GS.achievements.kills[bs.enemy.id]||0)+1;
  bAddLog('Defeated '+bs.enemy.name+'!\n'+coins+' MC ・ '+exp+' EXP gained!'+(droppedItem!==null&&ITEM_DATA[droppedItem]?'\nObtained ['+ITEM_DATA[droppedItem].name+']!':''),'gold',600);
  const leveled=gainExp(exp);if(leveled){playSFX('levelup');bAddLog('Level Up! Reached LV.'+GS.lv+'!\n'+randFrom(EXPLORE_TEXTS.levelUp),'gold',700);}
  updateStatus();updateInventory();updateAchievements();saveState();
  setTimeout(()=>bAddCb(()=>battleEnd(false,false,false,droppedItem)),2000);
}

function battleEnd(playerDied,escaped,substituted,droppedItem,enemyRan){
  if(!battleState)return;const bs=battleState;const wFn=bs.onWin;battleState=null;
  setTimeout(()=>{
    document.getElementById('battleModal').classList.add('hidden');clearBattleCmds();document.getElementById('battleLog').innerHTML='';
    if(playerDied){gameOver();}
    else if(substituted){playBGM('explore',null);addLog('Anonymous','You survived thanks to the power of the Mona Decoy Doll... Starting again from B1.','red',500,'anon');setTimeout(()=>goToFloor(1),2500);}
    else if(enemyRan){playBGM('explore',null);addLog(randFrom(ANON_NAMES),'The enemy fled... Continue exploring.','',600,'anon');if(wFn)wFn(null);}
    else{playBGM('explore',null);if(wFn)wFn(droppedItem);}
  },400);
}

function gameOver(){
  //playBGM('explore',null);
  const savedAch=GS.achievements;const savedName=GS.explorerName;
  GS=initNewState(savedName);GS.achievements=savedAch;GS.floor=0;
  saveState();localStorage.removeItem(SAVE_KEY+'_floor');
  setTimeout(()=>{addLog('Anonymous','You lost all Monacoins and all your items.\nOnly your achievements remain.','red',1000,'anon');setTimeout(()=>{addLog('Anonymous','You were sent back to the B0 Guild...','',1500,'anon');setTimeout(()=>goToFloor(0),3000);},2000);},1000);
}
 
/* =====================================================
   SECTION 9: EVENT PROCESSORS
   ===================================================== */
 
function processNextEvent(){
  try{
    if(currentEventIdx>=currentFloorEvents.length){
      // イベントが尽きた（異常状態）→ 階段だけのイベントに差し替えて続行
      currentFloorEvents=[{type:'stairs'}];currentEventIdx=0;saveFloorEvents();
      addLog('Anonymous','(Exploration data anomaly detected. You discovered the next staircase.)','gray',600,'anon');
      setTimeout(processNextEvent,1200);return;
    }
    const event=currentFloorEvents[currentEventIdx];currentEventIdx++;saveFloorEvents();
    switch(event.type){case 'treasure':processTreasure();break;case 'monster':processMonster(event.monsterId,event.monsterLv,false);break;case 'boss':processMonster(event.monsterId,event.monsterLv,true);break;case 'npc':processNpc(event.npcId);break;case 'shop':processShop();break;case 'stairs':processStairs();break;default:processNextEvent();}
  }catch(e){
    console.error('processNextEvent error:',e);
    localStorage.removeItem(SAVE_KEY+'_floor');
    currentFloorEvents=generateFloorEvents(GS.floor);currentEventIdx=0;saveFloorEvents();
    addLog('Anonymous','(An error occurred in floor events, so they were reset.)','gray',600,'anon');
    setTimeout(processNextEvent,1500);
  }
}
function processTreasure(){
  addLog(randFrom(ANON_NAMES),randFrom(EXPLORE_TEXTS.explore)+'\n'+randFrom(EXPLORE_TEXTS.treasure),'',1200,'anon');
  setTimeout(()=>{addLog(randFrom(ANON_NAMES),'You found a treasure chest!','bold',800,'anon');playSFX('treasure');setTimeout(()=>{addCmd([{label:'🎁 Open the chest',action:openTreasure},{label:'🚶 Ignore it',action:()=>{addLog(GS.explorerName,'You decided not to touch the chest.','',800,'player');setTimeout(processNextEvent,1500);}}]);},800);},1300);
}
function openTreasure(){
  playSFX('item');
  if(Math.random()<0.1){addLog(randFrom(ANON_NAMES),'The chest... moved!? It’s a Mimic!!','red',800,'anon');setTimeout(()=>{const mimicData={...MIMIC_DATA,lv:Math.max(1,randInt(0,MIMIC_DATA.maxLv||3)+GS.floor)};processMonster(99,mimicData.lv,false);},1200);}
  else{const pool=getItemsForFloor(GS.floor);if(pool.length===0){addLog(randFrom(ANON_NAMES),'You opened the chest... but it was empty.','gray',800,'anon');setTimeout(processNextEvent,1800);return;}
    const item=randFrom(pool);GS.items.push(item.id);if(!GS.achievements.itemSeen.includes(item.id))GS.achievements.itemSeen.push(item.id);saveState();updateInventory();updateAchievements();
    addLog(randFrom(ANON_NAMES),'You obtained ['+item.name+'] from the chest!','gold',800,'anon');playSFX('treasure');setTimeout(processNextEvent,1800);}
}
function processMonster(monsterId,monLv,isBoss){
  const monsterDef=monsterId===99?{...MIMIC_DATA,lv:monLv}:{...MONSTER_DATA.find(m=>m.id===monsterId)||MONSTER_DATA[0],lv:monLv};
  const introTxt=isBoss?'A massive presence looms ahead! The OP has appeared! ['+monsterDef.name+'] stands in your way!':randFrom(EXPLORE_TEXTS.monster)+'\n['+monsterDef.name+'] (Lv.'+monLv+') appeared!';
  addLog(randFrom(ANON_NAMES),introTxt,isBoss?'red bold':'',1000,'anon');if(isBoss)addLog(randFrom(ANON_NAMES),randFrom(EXPLORE_TEXTS.battleCheer),'',600,'anon');
  setTimeout(()=>{startBattle(monsterDef,isBoss,(droppedItem)=>{addLog(randFrom(ANON_NAMES),randFrom(EXPLORE_TEXTS.winComment),'gold',800,'anon');setTimeout(processNextEvent,1800);},()=>{});},1500);
}

function processNpc(npcId){
  const npc=NPC_DATA[npcId];if(!npc){processNextEvent();return;}
  const prog=GS.npcProgress[npcId]||0;
  if(prog>=npc.events.length){setTimeout(()=>{addLog(GS.explorerName,'...There is nothing around here.','',700,'npc');setTimeout(processNextEvent,1800);},1100);return;}
  addLog(randFrom(ANON_NAMES),randFrom(EXPLORE_TEXTS.npc),'',1000,'anon');
  const [dialogs,rewardType,rewardVal]=npc.events[prog];let delay=1100;
  dialogs.forEach(([speaker,line])=>{setTimeout(()=>{addLog(speaker==='NPC'?npc.name:GS.explorerName,line,'',700,speaker==='NPC'?'npc':'player');},delay);delay+=900;});
  setTimeout(()=>{
    if(rewardType==='coin'){GS.coins+=rewardVal;addLog(GS.explorerName,'Received '+rewardVal+' MonaCoins.','gold',500,'npc');}
    else if(rewardType==='item'){GS.items.push(rewardVal);const iname=ITEM_DATA[rewardVal]?ITEM_DATA[rewardVal].name:'???';if(!GS.achievements.itemSeen.includes(rewardVal))GS.achievements.itemSeen.push(rewardVal);addLog(GS.explorerName,'Received ['+iname+'].','gold',500,'npc');}
    else if(rewardType==='monaconvert'){
      const MONA_COIN_ID=10;const monaCount=GS.items.filter(x=>x===MONA_COIN_ID).length;
      if(monaCount>=10){
        const loopCount=Math.floor(monaCount/10);
        for(let i=0;i<10*loopCount;i++){const midx=GS.items.indexOf(MONA_COIN_ID);if(midx>=0)GS.items.splice(midx,1);}
        for(let i=0;i<loopCount;i++){GS.items.push(19);}
        const iname=ITEM_DATA[19]?ITEM_DATA[19].name:'???';if(!GS.achievements.itemSeen.includes(19))GS.achievements.itemSeen.push(19);
        addLog(GS.explorerName,'Gave '+(10*loopCount)+' ['+ITEM_DATA[10].name+'] and exchanged them for '+loopCount+' ['+iname+'].','gold',500,'npc');updateInventory();playSFX('item');
      } else {setTimeout(()=>{addLog(npc.name,'...What? You don’t even have 10.','',500,'npc');setTimeout(processNextEvent,1500);},1000);return;}
    }
    else if(rewardType==='swordconvert'){
      const CONVERT_ID=27;const convertCount=GS.items.filter(x=>x===CONVERT_ID).length;
      if(convertCount>=81){
        const loopCount=Math.floor(convertCount/81);
        for(let i=0;i<81*loopCount;i++){const midx=GS.items.indexOf(CONVERT_ID);if(midx>=0)GS.items.splice(midx,1);}
        for(let i=0;i<loopCount;i++){GS.items.push(33);}
        const iname=ITEM_DATA[33]?ITEM_DATA[33].name:'???';if(!GS.achievements.itemSeen.includes(33))GS.achievements.itemSeen.push(33);
        addLog(GS.explorerName,'Gave '+(81*loopCount)+' ['+ITEM_DATA[27].name+'] and exchanged them for '+loopCount+' ['+iname+'].','gold',500,'npc');updateInventory();playSFX('item');
      } else {setTimeout(()=>{addLog(npc.name,'...What? You don’t even have 81.','',500,'npc');setTimeout(processNextEvent,1500);},1000);return;}
    }
    else if(rewardType==='allheal'){
        GS.hp=GS.maxHp;
        addLog(GS.explorerName,'HP fully restored.','gold',500,'npc');playSFX('item');
    }
    GS.npcProgress[npcId]=(prog+1);saveState();updateStatus();updateInventory();updateAchievements();setTimeout(processNextEvent,1800);
  },delay+200);
}
function processShop(){
  const keeper=randFrom(SHOP_KEEPER_DIALOGS);const shopItems=getShopItems(GS.floor);
  addLog(randFrom(ANON_NAMES),randFrom(EXPLORE_TEXTS.shop),'',1000,'anon');
  setTimeout(()=>{addLog('Shopkeeper',keeper[0],'',600,'npc');setTimeout(()=>{addLog('Shopkeeper',keeper[1],'',600,'npc');setTimeout(()=>{showShopCommands(shopItems,keeper,false);},1000);},800);},1100);
}
function showShopCommands(shopItems,keeper,boughtOnce){
  const cmds=shopItems.map(item=>({label:item.name+' ['+item.price+'MC]',disabled:boughtOnce||GS.coins<item.price,action:()=>{
    GS.coins-=item.price;GS.items.push(item.id);if(!GS.achievements.itemSeen.includes(item.id))GS.achievements.itemSeen.push(item.id);saveState();updateStatus();updateInventory();updateAchievements();playSFX('buy');
    addLog(GS.explorerName,'Purchased ['+item.name+'] for '+item.price+' MC.','',600,'player');addLog('Shopkeeper',keeper[2],'',500,'npc');setTimeout(processNextEvent,1600);}}));
  cmds.push({label:'🚶 Buy nothing',action:()=>{addLog(GS.explorerName,'Did not buy anything this time.','gray',500,'player');addLog('Shopkeeper','...','',400,'npc');setTimeout(processNextEvent,1500);}});
  addCmd(cmds);
}
//階段到達
function processStairs(){
  playSFX('stairs');addLog(randFrom(ANON_NAMES),randFrom(EXPLORE_TEXTS.stairs),'',1000,'anon');
  setTimeout(()=>{addLog(randFrom(ANON_NAMES),'You found the stairs leading to the next floor B'+(GS.floor+1)+'!','gold',700,'anon');
    setTimeout(()=>{addCmd([{label:'▼ Go to B'+(GS.floor+1),action:()=>{addLog(GS.explorerName,'Headed toward B'+(GS.floor+1)+'...','',600,'player');setTimeout(()=>goToFloor(GS.floor+1),1500);}}]);setTimeout(()=>{stairAds();},100);},900);},1200);
    
}

// function playgamaAds(){
//   if(bridge.advertisement.isInterstitialSupported){
//     playBGM(null,null);
//     bridge.advertisement.minimumDelayBetweenInterstitial;
//     bridge.advertisement.setMinimumDelayBetweenInterstitial(300);

//     bridge.advertisement.on(
//           bridge.EVENT_NAME.INTERSTITIAL_STATE_CHANGED, 
//           state => isPlaygamaAds(state)?goToFloor(GS.floor+1):console.log('Interstitial state: ', state)
//     ); 

//     let placement = 'interstitial_placement';
//     bridge.advertisement.showInterstitial(placement);
//   }
//   else {
//     goToFloor(GS.floor+1);
//   }  
// }

// function isPlaygamaAds(state){return state==='closed'||state==='failed';}

function stairAds(){
  const ads=document.getElementById('stair-ads');
  ads.style.display=ads.style.display==='block'?'none':'block';

  var prefix = "element-playgama";
  var elements = document.querySelectorAll('[id^="' + prefix + '"]');
  if (elements.length === 0) return;
  var randomIndex = Math.floor(Math.random() * elements.length);
  elements[randomIndex+1].style.display = "inline-block";
}

function goToFloor(num){GS.floor=num;if(num>GS.achievements.maxFloor)GS.achievements.maxFloor=num;GS.threadId=generateThreadId();saveState();localStorage.removeItem(SAVE_KEY+'_floor');location.reload();}
 
/* =====================================================
   SECTION 10: FLOOR ENTRY POINTS
   ===================================================== */
 
function startFloor0Guild(){
  playBGM('explore',null);setThreadTitle();
  addLog('Guild Receptionist','Welcome to the Explorer Guild. This is the starting point for dungeon exploration—a safe place.','bold',800,'npc');
  addLog('Guild Receptionist',GS.explorerName+', first check your current status.','',900,'npc');
  setTimeout(()=>{
    addLog('Guild Receptionist','Name: '+GS.explorerName+'\nLV: 1  HP: '+GS.maxHp+'/'+GS.maxHp+'\nAT: '+GS.at+'  DF: '+GS.df+'  SP: '+GS.sp+'\nMoney: 0 MC','gold',1000,'npc');
    setTimeout(()=>{addLog('Guild Receptionist','Once you are ready, head to the dungeon. Stay safe.','',1000,'npc');addLog(randFrom(ANON_NAMES),'Good luck out there!','',700,'anon');addCmd([{label:'⚔ Head to the Dungeon',action:()=>{addLog(GS.explorerName,'Alright, let’s go!','bold',700,'player');setTimeout(()=>goToFloor(1),1500);}}]);},2000);
  },1800);
}

function startFloor(){
  if(GS.floor===0){startFloor0Guild();return;}
  playBGM('explore',null);setThreadTitle();
  const savedF=loadFloorEvents();
  if(savedF&&Array.isArray(savedF.events)&&savedF.events.length>0&&(savedF.idx||0)<savedF.events.length){currentFloorEvents=savedF.events;currentEventIdx=savedF.idx||0;}
  else{currentFloorEvents=generateFloorEvents(GS.floor);currentEventIdx=0;saveFloorEvents();}
  addLog(randFrom(ANON_NAMES),randFrom(EXPLORE_TEXTS.descend).replace('{floor}',GS.floor),'',1000,'anon');
  addLog(GS.explorerName,'You arrived at B'+GS.floor+'. Let the exploration begin.','',900,'player');
  if(GS.floor%5===0)addLog(randFrom(ANON_NAMES),'This is an OP floor! Powerful enemies are waiting ahead!','red',700,'anon');
  setTimeout(()=>{addCmd([{label:'👣 Continue Exploring',action:()=>{addLog(GS.explorerName,'Moving forward...','gray',500,'player');setTimeout(processNextEvent,1000);}}]);},2500);
}
 
/* =====================================================
   SECTION 11: INITIALIZATION
   ===================================================== */
 
function init(){
  setTimeout(()=>{const ld=document.getElementById('loadingDiv');ld.style.opacity='0';setTimeout(()=>ld.style.display='none',500);},400);
  document.querySelectorAll('.section-header').forEach(h=>{h.addEventListener('click',()=>{const target=document.getElementById(h.dataset.target);if(!target)return;target.classList.toggle('collapsed');h.classList.toggle('collapsed');});});
  const bgmV=document.getElementById('bgmVol');const sfxV=document.getElementById('sfxVol');
  bgmV.addEventListener('input',()=>{document.getElementById('bgmVolLabel').textContent=bgmV.value;if(bgmAudio)bgmAudio.volume=getBgmVol();});
  sfxV.addEventListener('input',()=>{document.getElementById('sfxVolLabel').textContent=sfxV.value;});
  document.getElementById('itemPopupClose').onclick=()=>{document.getElementById('itemPopup').classList.add('hidden');};
  document.getElementById('creditBtn').onclick=()=>{document.getElementById('creditModal').classList.remove('hidden');};
  document.getElementById('creditClose').onclick=()=>{document.getElementById('creditModal').classList.add('hidden');};
  const regModal=document.getElementById('regModal');const nameInput=document.getElementById('nameInput');const nameError=document.getElementById('nameError');const regBtn=document.getElementById('regBtn');
  regBtn.addEventListener('click',()=>{const n=nameInput.value.trim();if(!/^[A-Za-z0-9]{1,16}$/.test(n)){nameError.textContent='Please enter only alphanumeric characters, 1 to 16 characters long.';return;}nameError.textContent='';GS=initNewState(n);saveState();regModal.classList.add('hidden');updateStatus();updateInventory();updateAchievements();startFloor();});
  nameInput.addEventListener('keydown',e=>{if(e.key==='Enter')regBtn.click();});
  const saved=loadState();
  if(!saved||!saved.explorerName){regModal.classList.remove('hidden');nameInput.focus();return;}
  GS=Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)),saved);
  if(!GS.achievements)GS.achievements={kills:{},maxFloor:0,itemSeen:[],monsterSeen:[]};
  if(!GS.achievements.itemSeen)GS.achievements.itemSeen=[];
  if(!GS.achievements.monsterSeen)GS.achievements.monsterSeen=[];
  if(!GS.npcProgress)GS.npcProgress={};
  if(!GS.hiddenGrowth)GS.hiddenGrowth={hp:0,at:0,df:0,sp:0};
  logCommentNum=1;updateStatus();updateInventory();updateAchievements();
  document.body.addEventListener('click',()=>{getAudioCtx();},{once:true});
  startFloor();
}
 
window.addEventListener('DOMContentLoaded',init);