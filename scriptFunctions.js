function scriptText(name, desc){
    var div = document.createElement('div');
    div.innerHTML = name;
    div.title = desc;
    div.setAttribute('style','text-align: center;')
    document.getElementById('mods').appendChild(div);
}
var scriptFunctions = {
'rapidReload':{
    'load':function(weapon){
        this.txt(weapon);
    },'txt':function(weapon){
        var reload = {'hand crossbow':'free','light crossbow':'free','heavy crossbow':'move','one-handed firearm':'move','two-handed firearm':'standard'};
        var txt = 'The time required for you to reload your '+weapon+' is reduced to a '+reload[weapon]+' action. ';
        txt += 'Reloading still provokes attacks of opportunity.'
        if (weapon == "hand crossbow" || weapon == "light crossbow"){
            txt += ' You may fire that weapon as many times in a full-attack action as you could attack if you were using a bow.'
        }
        scriptText('Rapid Reload - '+weapon,txt);
    },'display':function(weapon){
        this.txt(weapon);
    }
},'darkvision':{
    'load':function(range){
        this.txt(range);
    },'txt':function(range){
        var name = 'Darkvision - '+range+'ft';
        var txt = 'Darkvision is the extraordinary ability to see with no light source at all, out to a range specified for the creature. Darkvision is black-and-white only (colors cannot be discerned). It does not allow characters to see anything that they could not see otherwise—invisible objects are still invisible, and illusions are still visible as what they seem to be. Likewise, darkvision subjects a creature to gaze attacks normally. The presence of light does not spoil darkvision.'
        scriptText(name, txt);
    },'display':function(range){
        this.txt(range);
    }
},'esotericScholar':{
    'load':function(){
        this.txt();
        var i;
        for (i in c.skills.rank){
            if (i.slice(0,3) == 'K. ' && c.skills.rank[i] == 0){
                document.getElementById(i+'Roll').removeAttribute('disabled');
                document.getElementById(i+'Roll').innerHTML = 'Roll1';
                document.getElementById(i+'Roll').title = 'Esoteric Scholar: '+this.txty;
            }
        }
    },'txt':function(){
        this.txty = 'Once a day, attempt a Knowledge check even when if you are not trained in that Knowledge skill.';
        scriptText('Esoteric Scholar', this.txty);
    },'display':function(){
        this.txt();
        // more to do
    }
},'greatFortitude':{
    'load':function(){
        this.txt();
        t.saves.mods.fort.greatFortitude = 2;
    },'txt':function(){
        scriptText('Great Fortitude', 'You get a +2 bonus on all Fortitude saving throws.');
    },'display':function(){
        this.load();
    }
},'raceSneaky':{
    'load':function(){
        this.txt();
        t.skills.mods.Stealth.raceSneaky = 4;
    },'txt':function(){
        scriptText('Sneaky','Receive a +4 racial bonus on Stealth checks.');
    },'display':function(){
        this.load();
    }
},'trapFinding':{
    'load':function(){
        this.txt();
        t.skills.mods['Perception Traps'] = {'trapFinding':this.bonus()};
        copySkill('Perception','Perception Traps');
        t.skills.mods['Disable Device'].trapFinding = this.bonus();
        document.getElementById('Disable DeviceMod').innerHTML = t.skills.total('Disable Device').total;
        document.getElementById('Disable DeviceMod').title = JSON.stringify(t.skills.total('Disable Device'));
    },'txt':function(){
        var txt = 'A rogue adds 1/2 her level to Perception skill checks made to locate traps and to Disable Device skill checks (minimum +1). A rogue can use Disable Device to disarm magic traps.'
        scriptText('Trapfinding (+'+this.bonus()+')',txt);
    },'bonus':function(){
        var bonus = Math.floor(c.level/2);
        if (bonus < 1){bonus = 1};
        return bonus;
    },'display':function(){
        this.txt();
        // more to do
    }
},'trapSense':{
    'load':function(bonus){
        this.txt(bonus);
        // reflex save to traps
        var rrow = document.createElement('tr');
        var label = document.createElement('td');
        label.innerHTML = 'Ref. Traps';
        rrow.appendChild(label);
        var buttontd = document.createElement('td');
        var button = document.createElement('button');
        button.innerHTML = 'Roll';
        button.setAttribute('onclick','scriptFunctions.trapSense.reflex('+bonus+')');
        buttontd.appendChild(button);
        rrow.appendChild(buttontd);
        var rresult = document.createElement('td');
        rresult.id = 'refTrapSave';
        rrow.appendChild(rresult);
        document.getElementById('savingThrowContainer').appendChild(rrow);
        // ac to traps
        var row = document.createElement('div');
        row.setAttribute('style','display:flex; justify-content: space-between;');
        row.innerHTML = 'AC to traps:';
        var result = document.createElement('span');
        result.id = 'trapAC';
        row.appendChild(result);
        document.getElementById('acContainer').appendChild(row);
        t.ac.funcs.trapSense = function(){
            var trapAC = Number(document.getElementById('ac').innerHTML);
            if (t.ac.dexAllowed){trapAC+=bonus};
            document.getElementById('trapAC').innerHTML = trapAC;
        }
        t.ac.funcs.trapSense();
    },'reflex':function(bonus){
        var o = t.saves.roll('ref');
        o.trapSense = bonus;
        o.total += bonus;
        document.getElementById('refTrapSave').innerHTML = o.total;
        document.getElementById('refTrapSave').title = JSON.stringify(o);
    },txt:function(bonus){
        var txt = '+'+bonus+' bonus on Reflex saves made to avoid traps and a +1 dodge bonus to AC against attacks made by traps.';
        scriptText('Trap Sense',txt);
    },'display':function(bonus){
        this.txt(bonus);
        // more to do
    }
},'evasion':{
    'load':function(){
        this.txt();
    },'txt':function(){
        var txt = ' If she makes a successful Reflex saving throw against an attack that normally deals half damage on a successful save, she instead takes no damage. Evasion can be used only if the rogue is wearing light armor or no armor. A helpless rogue does not gain the benefit of evasion.';
        scriptText('Evasion',txt);
    },'display':function(){
        this.txt();
    }
},'pointBlankShot':{
    'load':function(){
        this.txt();
        addCondition("Target < 30' Away",';');
        t.attack.funcs.pointBlankShot=function(body){
            if (document.getElementById("Target < 30' AwayCheck").checked && t.attack.currentWeapon(body).subCat == 'Ranged'){
                t.attack.mods.pointBlankShot = 1;
            } else {
                delete t.attack.mods.pointBlankShot;
            }
        }
        t.dmg.funcs.all.pointBlankShot=function(body){
            if (document.getElementById("Target < 30' AwayCheck").checked && t.attack.currentWeapon(body).subCat == 'Ranged'){
                t.dmg.mods.all.pointBlankShot = 1;
            } else {
                delete t.dmg.mods.all.pointBlankShot;
            }
        }
    },'txt':function(){
        var txt = 'You get a +1 bonus on attack and damage rolls with ranged weapons at ranges of up to 30 feet.';
        scriptText('Point-Blank Shot',txt);
    },'display':function(){
        this.load();
    }
},'sneakAttack':{
    'load':function(dmg){
        this.txt(dmg);
        addCondition('Sneak Attack',';');
        scriptFunctions.sneakAttack.dmg = dmg;
        t.dmg.funcs.all.sneakAttack=function(body){
            if(document.getElementById('Sneak AttackCheck').checked){
                t.dmg.precision.all.sneakAttack = diceText(dmg);
            } else {
                delete t.dmg.precision.all.sneakAttack;
            }
        }
    },'txt':function(dmg){
        var txt = 'Deal extra damage anytime your target would be denied a Dexterity bonus to AC, or when you flank your target.'
        scriptText('Sneak Attack - '+dmg,txt);
    },'display':function(dmg){
        this.txt(dmg);
        addCondition('Sneak Attack','updateWeapon("mainHand")');
        scriptFunctions.sneakAttack.dmg = dmg;
        t.dmg.funcs.all.sneakAttack=function(body){
            if(document.getElementById('Sneak AttackCheck').checked){
                t.dmg.txt.all.sneakAttack = dmg;
            } else {
                delete t.dmg.txt.all.sneakAttack;
            }
        }
    }
},'uncannyDodge':{
    'load':function(){
        this.txt();
    },'txt':function(){
        var txt = 'You cannot be caught flat-footed, nor can you lose your Dex bonus to AC if the attacker is invisible. You still lose your Dexterity bonus to AC if immobilized. You can still lose her Dexterity bonus to AC if an opponent successfully uses the feint action against you.';
        scriptText('Uncanny Dodge',txt);
    },'display':function(){
        this.txt();
    }
},'weaponFocus':{
    'load':function(weapon){
        this.txt(weapon);
        t.attack.funcs.weaponFocus=function(body){
            if(t.attack.currentWeapon(body).name == weapon){
                t.attack.mods.weaponFocus = 1;
            } else {
                delete t.attack.mods.weaponFocus;
            }
        }
    },'txt':function(weapon){
        var txt = 'You gain a +1 bonus on all attack rolls you make using '+weapon;
        scriptText('Weapon Focus',txt);
    },'display':function(weapon){
        this.load();
    }
},'cigar':{
    'load':function(){
        t.abilities.mods.cha.cigar = 2;
        this.txt();
    },'txt':function(){
        scriptText('Cigar','+20,000 to any one roll.  A permanent aroma of fancy smoke lingers on you, which gives you a +2 to any charisma-based check until you wash the smell off.  The smell never goes away otherwise.')
    },'display':function(){
        this.load();
    }
},'aura':{
    'load':function(){
        this.txt();
    },'txt':function(){
        scriptText('Aura',"A cleric of a chaotic, evil, good, or lawful deity has a particularly powerful aura corresponding to the deity's alignment.");
    },'display':function(){
        this.txt();
    }
},'channelEnergy':{
    'load':function(hp){
        this.txt(hp);
    },'txt':function(hp){
        var txt = 'Causes a burst that affects all creatures of one type (either undead or living) in a 30-foot radius centered on the cleric.';
        txt += 'The amount of damage dealt or healed is equal to ' + hp + '. ';
        txt += 'Creatures that take damage from channeled energy receive a DC '
        txt += 10 + Math.floor(t.level/2) + t.abilities.mod('cha');
        txt += ' Will save to halve the damage. '
        var times = 3 + t.abilities.mod('cha');
        txt += 'A cleric may channel energy '+times+' times per day. '
        txt += 'This is a standard action that does not provoke an attack of opportunity. A cleric can choose whether or not to include herself in this effect. '
        txt += 'A cleric must be able to present her holy symbol to use this ability.'
        scriptText('Channel Energy',txt)
    },'display':function(hp){
        this.txt(hp);
    }
},'custom':{
    'load':function(){
        t.ac.mods.dodge.ruleAdjust = 3;
    },'txt':function(){
        scriptText('custom')
    },'display':function(){
        this.txt();
    }
}
}