var t;
function createTemp(){
t = JSON.parse(JSON.stringify(c));
// skills
t.skills.mods={}
for (i in t.skills.rank){t.skills.mods[i]={}};
t.skills.AbilityMod=function(skill){return t.abilities.mod(skillData[skill].ability)};
t.skills.class=function(skill){
    var classy = classData[c.class].skills[skill]*3;
    var hasRanks;
    if(t.skills.rank[skill]>0){hasRanks=true}else{hasRanks=false};
    if(hasRanks){return classy}else{return 0};
}
t.skills.checkPenalty=function(skill){if (skillData[skill].ability == 'dex' || skillData[skill].ability == 'str'){return t.checkPenalty()}else{return 0}};
t.skills.total=function(skill){
    var components = {
        'rank':this.rank[skill],
        'ability': this.AbilityMod(skill),
        'class': this.class(skill),
        'checkPenalty':this.checkPenalty(skill)
    }
    var i;
    for (i in this.mods[skill]){components[i] = this.mods[skill][i]};
    var total = 0;
    for (i in components){total += components[i]};
    components.total = total;
    return components;
}
t.skills.roll=function(skill){
    var components = this.total(skill);
    delete components.total;
    components.d20 = dice(1,20);
    var total = 0;
    for (i in components){total += components[i]};
    components.total = total;
    return components;
}
t.skills.totalSpent=function(){
    var total = 0;
    var i;
    for (i in this.rank){total+=this.rank[i]};
    return total;
}
t.skills.totalRanks=function(){
    var components = {
        'class':classData[t.class].RanksLevel * t.level,
        'int':t.abilities.mod('int') * t.level,
        'fcb':t.skills.fcb
    };
    var i;
    for (i in this.totalRanksMods){components[i] = this.totalRanksMods[i]};
    var total = 0;
    for (i in components){total+=components[i]};
    components.total = total;
    return components;
}
// abilities
t.abilities.addTotal=function(){return levelData[t.level].abilityScore};
t.abilities.addSpent=function(){
    var total = 0;
    var i;
    for (i in t.abilities.add){total+=t.abilities.add[i]};
    return total;
};
t.abilities.score=function(ab){return this.points[ab]+this.race[ab]+this.add[ab]};
t.abilities.mods = {"str":{},"dex":{},"con":{},"int":{},"wis":{},"cha":{}};
t.abilities.mod=function(ab){
    var total = Math.floor((this.score(ab)-10)/2);
    var i;
    for (i in this.mods[ab]){total+=this.mods[ab][i]};
    return total;
};
t.abilities.roll=function(ab){
    var components = {
        'd20':dice(1,20),
        'abilityMod':this.mod(ab)
    }
    var i;
    var total = 0;
    for (i in components){total += components[i]};
    components.total = total;
    return components;
};
// saves
t.saves.mods = {'fort':{},'ref':{},'will':{}};
t.saves.abilities = {'fort':'con','ref':'dex','will':'wis'};
t.saves.base=function(save){return classData[t.class].level[t.level][save+'Save']};
t.saves.roll=function(save){
    var components = {
        'base':this.base(save),
        'ability':t.abilities.mod(this.abilities[save]),
        'd20':dice(1,20)
    }
    for(i in this.mods[save]){components[i] = this.mods[save][i]};
    var total = 0;
    for (i in components){total += components[i]};
    components.total = total;
    return components;
};
// AC
t.items.Inventory.Armor.None={'bonus':0,'dexBonus':80,'acPenalty':0,'speed30':30,'speed20':20};
t.ac={};
t.ac.mods={'dodge':{}}
t.ac.dexAllowed = true;
t.ac.funcs = {};
t.ac.currentArmor=function(){return t.items.Inventory.Armor[document.getElementById('armor').value]};
t.ac.currentShield=function(){return t.items.Inventory.Armor[document.getElementById('shield').value]};
t.ac.dexBonus=function(){return Math.min(t.abilities.mod('dex'),this.currentArmor().dexBonus,t.load().maxDex)};
t.ac.total=function(){
    var components = {
        'base':10,
        'armor':this.currentArmor().bonus,
        'shield':this.currentShield().bonus,
        'size':t.size.mod()
    }
    var i;
    if(this.dexAllowed){
        components.dex = this.dexBonus();
        for (i in this.mods.dodge){components[i] = this.mods.dodge[i]};
    }
    for (i in this.funcs){this.funcs[i]()};
    // addemup
    var total = 0;
    for (i in components){total+=components[i]};
    components.total = total;
    return components;
}
t.ac.touch=function(){
    var components = {
        'base':10,
        'size':t.size.mod()
    }
    var i;
    if(this.dexAllowed){
        components.dex = this.dexBonus();
        for (i in this.mods.dodge){components[i] = this.mods.dodge[i]};
    }
    var total = 0;
    for (i in components){total+=components[i]};
    components.total = total;
    return components;
}
// size
t.size.mod=function(){return sizeData[this.name].Mod};
t.size.dmg=function(){return {'Small':'sDmg','Medium':'mDmg'}[this.name]};
t.size.dim=function(){return sizeData[this.name].Dimensions};
// attack
t.attack = {};
t.attack.bab=function(){return classData[t.class].level[t.level].bab};
t.attack.mods = {};
t.attack.funcs = {};
t.items.Inventory.Weapons.None = {'isNone':true,'sDmg':'1d2','mDmg':'1d3'};
t.items.Inventory.Ammunition.None = {'isNone':true};
t.attack.currentWeapon=function(body){return t.items.Inventory.Weapons[document.getElementById(body+'Weapon').value]};
t.attack.currentAmmo=function(body){return t.items.Inventory.Ammunition[document.getElementById(body+'Ammo').value]};
t.attack.roll=function(body){
    var components = {
        'bab':t.attack.bab(),
        'size':-t.size.mod(),
        'd20':dice(1,20)
    }
    if (this.currentWeapon(body).subCat == "Ranged"){
        components.dex = t.abilities.mod('dex');
    } else {
        components.str = t.abilities.mod('str');
    }
    // two handed
    if (body == 'mainHand' && !this.currentWeapon('offHand').isNone){
        if (this.currentWeapon('offHand').subCat == "Light"){components.twoHanded = -4}else{components.twoHanded = -6};
    }
    if (body == 'offHand'){
        if (this.currentWeapon('offHand').subCat == "Light"){components.twoHanded = -8}else{components.twoHanded = -10};
    }
    var i;
    for (i in this.funcs){this.funcs[i](body)};
    // addemup
    for (i in this.mods){components[i] = this.mods[i]};
    var total = 0;
    for (i in components){total += components[i]};
    components.total = total;
    if (components.d20 >= this.currentWeapon(body).mincrit){components.crit=true};
    return components;
}
// dmg
t.dmg = {}
t.dmg.mods = {'mainHand':{},'offHand':{},'all':{}}
t.dmg.mults = {'mainHand':{'crit':1},'offHand':{'crit':1},'all':{}}
t.dmg.funcs = {'mainHand':{},'offHand':{},'all':{}}
t.dmg.precision = {'mainHand':{},'offHand':{},'all':{}}
t.dmg.roll=function(body){
    var cw = t.attack.currentWeapon(body);
    var components = {
        'weapon':diceText(cw[t.size.dmg()])
    }
    var str = t.abilities.mod('str')
    if (cw.subCat != 'Ranged'){
        components.str = str;
        if (body == 'offHand'){
            if(str > 0){components.str = Math.floor(str/2)};
        }
        if (cw.subCat != 'Light' && t.attack.currentWeapon('offHand').isNone){components.str = Math.floor(str*1.5)}
    }
    var i;
    for (i in this.funcs[body]){this.funcs[body][i]()};
    for (i in this.funcs.all){this.funcs.all[i](body)};
    // addemup
    for (i in this.mods[body]){components[i] = this.mods[body][i]};
    for (i in this.mods.all){components[i] = this.mods.all[i]};
    var total = 0;
    for (i in components){total += components[i]};
    var mults = 0;
    for (i in this.mults[body]){mults += this.mults[body][i]};
    for (i in this.mults.all){mults += this.mults.all[i]};
    total *= mults;
    components.multiplier = mults;
    for (i in this.precision[body]){
        total+=this.precision[body][i];
        components[i] = this.precision[body][i];
    }
    for (i in this.precision.all){
        total+=this.precision.all[i];
        components[i] = this.precision.all[i];
    }
    components.total = total;
    return components;
}
// other
t.prettyHeight=function(){
    var feet = Math.floor(this.height/12);
    var inches = this.height%12;
    return feet + "' " + inches +'"';
}
t.prettyWeight=function(){return this.weight + " lbs."};
t.prettyWealth=function(){return money(this.wealth)};
t.favoredClassSpent=function(){return t.skills.fcb + t.hp.fcb};
t.totalFeats=function(){
    var components = {};
    if (t.class == 'Rogue'){components.level = t.level}else{components.level = levelData[t.level].feats};
    if (t.class == 'Fighter'){components.fighter = 1};
    if (t.race == 'Human'){components.human = 1};
    var total = 0;
    var i;
    for (i in components){total+=components[i]};
    components.total = total;
    return components;
}
// inventory
t.totalWeight=function(loc){
    var total = 0;
    var i;
    for (i in c.items[loc]){
        var k;
        for (k in c.items[loc][i]){
            var obj = c.items[loc][i][k];
            var itemWeight = Number(obj.weight)
            if (typeof(itemWeight) == 'undefined'){itemWeight = 0};
            if (isNaN(itemWeight)){itemWeight = 0};
            var quant = obj.quantity;
            if (typeof(quant) == 'undefined'){quant = 1};
            itemWeight *= quant;
            total += itemWeight;
        }
    }
    return total;
}
t.load=function(){
    var strCat = loadData[t.abilities.score('str')];
    var carrying = t.totalWeight('Inventory');
    var size;
    if(t.quad){size = sizeData[t.size.name].quad}else{size = sizeData[t.size.name].carry};
    if (carrying <= strCat.light*size){return encumbranceData.Light};
    if (carrying <= strCat.medium*size){return encumbranceData.Medium};
    if (carrying <= strCat.heavy*size){return encumbranceData.Heavy};
    if (carrying <= strCat.heavy*2*size){return encumbranceData.Staggered};
    return encumbranceData.Immobile;
}
t.checkPenalty=function(){return Math.min(t.load().checkPenalty,t.ac.currentArmor().acPenalty)};
t.totalSpeed=function(){return Math.min(t.speed, t.ac.currentArmor()['speed'+t.speed], t.load().speed())};
t.loadLimit=function(load){if(t.quad){return loadData[t.abilities.score.str][load]*sizeData[t.size.name].quad}else{return loadData[t.abilities.score.str][load]*sizeData[t.size.name].carry}}
// hp
t.hp.max=function(){
    var components = {
        'fcb':this.fcb,
        'class':classData[t.class].HitDie*t.level
    };
    var total = 0;
    var i;
    for (i in this.mods){components[i] = this.mods[i]};
    for (i in components){total+=components[i]};
    components.total = total;
    return components;
};
t.scripts.class=function(){return classData[t.class].level[t.level].scripts};
t.scripts.race=function(){return raceData[t.race].scripts};
};
