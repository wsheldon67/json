// config area
var startingAbilityPoints = 25;
var otherData = {
    'drunkTypes':['Happy','Sad','Generous','Gay','Angry'],
    'cupChart':['not used','not used','Flat','AA','A','B','C','D','DD/E','DDD/F','G','H','I','J','K','L','M','N','O','P','Q','R'],
    'voice':{
        'accent':['American','Posh','Scottish','Russian','British','French','Cockney','Schwartzenegger','Indian','Southern','Austrailian','Yiddish','Mobster','Foghorn Leghorn','Retard','Nerd','Chain Smoker','Jamaican'],
        'pitch':['Normal','High','Low','Normal','Normal']
        
    }
}
var settings = {
    'militaryTime':false,
    'morningTime':8
}
// handy functions
function dice(q,d){
    var result = 0;
    for (i=0; i<q; i++){
        result = result + Math.floor(Math.random() * d) + 1;
    };
    return result;
};
function diceText (t){
    var ar = t.split("d");
    var q = ar[0];
    var d = ar[1];
    var result = 0;
    for (i=0; i<q; i++){
        result = result + Math.floor(Math.random() * d) + 1;
    };
    return result;
};
function removeElement(elementID){
    var element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
};
function randBetween(l,h){
    return Math.floor(Math.random()*(h+1-l)+l);
}
function show(section){
    var s = document.getElementById(section);
    var b = document.getElementById(section+'Show');
    if (s.style.display == 'none'){
        s.setAttribute('style','display: flex');
        b.removeAttribute('style');
    } else {
        s.setAttribute('style','display: none');
        b.setAttribute('style','background-color:grey;');
    }
}
function copySkill(oSkill, copyName){
    t.skills.rank[copyName] = t.skills.rank[oSkill];
    skillData[copyName] = skillData[oSkill];
    classData[c.class].skills[copyName] = classData[c.class].skills[oSkill];
    var i = copyName;
    var row = document.createElement('tr');
    var skill = document.createElement('td');
    skill.innerHTML = i;
    row.appendChild(skill);
    var mod = document.createElement('td');
    mod.innerHTML = t.skills.total(i).total;
    mod.title = JSON.stringify(t.skills.total(i));
    mod.id = i + 'Mod';
    row.appendChild(mod);
    var roll = document.createElement('button');
    var rolltd = document.createElement('td');
    roll.innerHTML = 'Roll';
    roll.id = i+'Roll';
    if (skillData[i].untrained == 0 && c.skills.rank[i] == 0){roll.setAttribute('disabled','disabled')}
    roll.setAttribute('onclick','skillRoll("'+i+'")');
    rolltd.appendChild(roll);
    row.appendChild(rolltd);
    var result = document.createElement('td');
    result.id = i + 'Result';
    row.appendChild(result);
    document.getElementById('skillTable').appendChild(row);
}
function objectSum(o,returnObject){
    var i;
    var total = 0;
    for (i in o){total+=o[i]};
    o.total = total;
    if(returnObject){return o}else{return total};
}
function addCondition(name,func){
    var row = document.createElement('div');
    var check = document.createElement('input');
    check.type = 'checkbox';
    check.id = name+'Check';
    check.setAttribute('oninput',func);
    row.appendChild(check);
    var label = document.createElement('span');
    label.innerHTML = name;
    row.appendChild(label);
    document.getElementById('conditions').appendChild(row);
}
function money(copper){
    if (copper < 10){
        return copper + "cp";
    } else if (copper < 100) {
        return copper/10 + "sp";
    } else {
        return copper/100 + "gp";
    };
};
function leadingZeros(num,digits){
    var numString = num.toString()
    var diff = digits-numString.length;
    if (diff < 0){diff = 0};
    while (diff > 0){
        numString = '0' + numString;
        diff--;
    }
    return numString;
}
// data
var classData = {
    'Barbarian':{'Type':'Core','StartingWealth':3,'AvgStartingGold':105,'RanksLevel':4,'Player':1,'HitDie':12,'AgeCategory':'Intuitive',
        'skills':{'Acrobatics':1,'Appraise':0,'Bluff':0,'Climb':1,'Craft':1,'Diplomacy':0,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':0,'Handle Animal':1,'Heal':0,'Intimidate':1,'K. Arcana':0,'K. Dungeon':0,'K. Engineering':0,'K. Geography':0,'K. History':0,'K. Local':0,'K. Nature':1,'K. Nobility':0,'K. Planes':0,'K. Religion':0,'Linguistics':0,'Perception':1,'Perform':0,'Profession':0,'Ride':1,'Sense Motive':0,'Sleight of Hand':0,'Spellcraft':0,'Stealth':0,'Survival':1,'Swim':1,'Use Magic Device':0,},
        'level':{
            1:{"bab":1,"fortSave":2,"refSave":0,"willSave":0,"Special":"Fast movement, rage","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":2,"fortSave":3,"refSave":0,"willSave":0,"Special":"Rage power, uncanny dodge","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":3,"fortSave":3,"refSave":1,"willSave":1,"Special":"Trap sense +1","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":4,"fortSave":4,"refSave":1,"willSave":1,"Special":"Rage power","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":5,"fortSave":4,"refSave":1,"willSave":1,"Special":"Improved uncanny dodge","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":6,"fortSave":5,"refSave":2,"willSave":2,"Special":"Rage power, trap sense +2","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":7,"fortSave":5,"refSave":2,"willSave":2,"Special":"Damage reduction 1/0","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":8,"fortSave":6,"refSave":2,"willSave":2,"Special":"Rage power","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":9,"fortSave":6,"refSave":3,"willSave":3,"Special":"Trap sense +3","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":10,"fortSave":7,"refSave":3,"willSave":3,"Special":"Damage reduction 2/0, rage power","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":11,"fortSave":7,"refSave":3,"willSave":3,"Special":"Greater rage","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":12,"fortSave":8,"refSave":4,"willSave":4,"Special":"Rage power, trap sense +4","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":13,"fortSave":8,"refSave":4,"willSave":4,"Special":"Damage reduction 3/0","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":14,"fortSave":9,"refSave":4,"willSave":4,"Special":"Indomitable will, rage power","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":15,"fortSave":9,"refSave":5,"willSave":5,"Special":"Trap sense +5","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":16,"fortSave":10,"refSave":5,"willSave":5,"Special":"Damage reduction 4/0, rage power","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":17,"fortSave":10,"refSave":5,"willSave":5,"Special":"Tireless rage","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":18,"fortSave":11,"refSave":6,"willSave":6,"Special":"Rage power, trap sense +6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":19,"fortSave":11,"refSave":6,"willSave":6,"Special":"Damage reduction 5/0","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":20,"fortSave":12,"refSave":6,"willSave":6,"Special":"Mighty rage, rage power","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
    'Bard':{'Type':'Core','StartingWealth':3,'AvgStartingGold':105,'RanksLevel':6,'Player':1,'HitDie':8,'AgeCategory':'SelfTaught',
        'skills':{'Acrobatics':1,'Appraise':1,'Bluff':1,'Climb':1,'Craft':1,'Diplomacy':1,'Disable Device':0,'Disguise':1,'Escape Artist':1,'Fly':0,'Handle Animal':0,'Heal':0,'Intimidate':1,'K. Arcana':1,'K. Dungeon':1,'K. Engineering':1,'K. Geography':1,'K. History':1,'K. Local':1,'K. Nature':1,'K. Nobility':1,'K. Planes':1,'K. Religion':1,'Linguistics':1,'Perception':1,'Perform':1,'Profession':1,'Ride':0,'Sense Motive':1,'Sleight of Hand':1,'Spellcraft':1,'Stealth':1,'Survival':0,'Swim':0,'Use Magic Device':1,},
        'level':{
            1:{"bab":0,"fortSave":0,"refSave":2,"willSave":2,"Special":"Bardic knowledge, bardic performance, cantrips, countersong, distraction, fascinate, inspire courage +1","s0":0,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":1,"fortSave":0,"refSave":3,"willSave":3,"Special":"Versatile performance, well-versed","s0":0,"s1":2,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":2,"fortSave":1,"refSave":3,"willSave":3,"Special":"Inspire competence +2","s0":0,"s1":3,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":3,"fortSave":1,"refSave":4,"willSave":4,"Special":0,"s0":0,"s1":3,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":3,"fortSave":1,"refSave":4,"willSave":4,"Special":"Inspire courage +2, lore master 1/day","s0":0,"s1":4,"s2":2,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":4,"fortSave":2,"refSave":5,"willSave":5,"Special":"Suggestion, versatile performance","s0":0,"s1":4,"s2":3,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":5,"fortSave":2,"refSave":5,"willSave":5,"Special":"Inspire competence +3","s0":0,"s1":4,"s2":3,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":6,"fortSave":2,"refSave":6,"willSave":6,"Special":"Dirge of doom","s0":0,"s1":4,"s2":4,"s3":2,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":6,"fortSave":3,"refSave":6,"willSave":6,"Special":"Inspire greatness","s0":0,"s1":5,"s2":4,"s3":3,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":7,"fortSave":3,"refSave":7,"willSave":7,"Special":"Jack-of-all-trades, versatile performance","s0":0,"s1":5,"s2":4,"s3":3,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":8,"fortSave":3,"refSave":7,"willSave":7,"Special":"Inspire competence +4, inspire courage +3, lore master 2/day","s0":0,"s1":5,"s2":4,"s3":4,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":9,"fortSave":4,"refSave":8,"willSave":8,"Special":"Soothing performance","s0":0,"s1":5,"s2":5,"s3":4,"s4":3,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":9,"fortSave":4,"refSave":8,"willSave":8,"Special":0,"s0":0,"s1":5,"s2":5,"s3":4,"s4":3,"s5":1,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":10,"fortSave":4,"refSave":9,"willSave":9,"Special":"Frightening tune, versatile performance","s0":0,"s1":5,"s2":5,"s3":4,"s4":4,"s5":2,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":11,"fortSave":5,"refSave":9,"willSave":9,"Special":"Inspire competence +5, inspire heroics","s0":0,"s1":5,"s2":5,"s3":5,"s4":4,"s5":3,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":12,"fortSave":5,"refSave":10,"willSave":10,"Special":0,"s0":0,"s1":5,"s2":5,"s3":5,"s4":4,"s5":3,"s6":1,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":12,"fortSave":5,"refSave":10,"willSave":10,"Special":"Inspire courage +4, lore master 3/day","s0":0,"s1":5,"s2":5,"s3":5,"s4":4,"s5":4,"s6":2,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":13,"fortSave":6,"refSave":11,"willSave":11,"Special":"Mass suggestion, versatile performance","s0":0,"s1":5,"s2":5,"s3":5,"s4":5,"s5":4,"s6":3,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":14,"fortSave":6,"refSave":11,"willSave":11,"Special":"Inspire competence +6","s0":0,"s1":5,"s2":5,"s3":5,"s4":5,"s5":5,"s6":4,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":15,"fortSave":6,"refSave":12,"willSave":12,"Special":"Deadly performance","s0":0,"s1":5,"s2":5,"s3":5,"s4":5,"s5":5,"s6":5,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
    'Cleric':{'Type':'Core','StartingWealth':4,'AvgStartingGold':140,'RanksLevel':2,'Player':1,'HitDie':8,'AgeCategory':'Trained',
        'skills':{'Acrobatics':0,'Appraise':1,'Bluff':0,'Climb':0,'Craft':1,'Diplomacy':1,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':0,'Handle Animal':0,'Heal':1,'Intimidate':0,'K. Arcana':1,'K. Dungeon':0,'K. Engineering':0,'K. Geography':0,'K. History':1,'K. Local':0,'K. Nature':0,'K. Nobility':1,'K. Planes':1,'K. Religion':1,'Linguistics':1,'Perception':0,'Perform':0,'Profession':1,'Ride':0,'Sense Motive':1,'Sleight of Hand':0,'Spellcraft':1,'Stealth':0,'Survival':0,'Swim':0,'Use Magic Device':0,},
        'level':{
            1:{"bab":0,"fortSave":2,"refSave":0,"willSave":2,"Special":"Aura, channel energy 1d6, domains, orisons, spontaneous casting","s0":3,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','1d6']],},
            2:{"bab":1,"fortSave":3,"refSave":0,"willSave":3,"Special":0,"s0":4,"s1":2,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','1d6']]},
            3:{"bab":2,"fortSave":3,"refSave":1,"willSave":3,"Special":"Channel energy 2d6","s0":4,"s1":2,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','2d6']]},
            4:{"bab":3,"fortSave":4,"refSave":1,"willSave":4,"Special":0,"s0":4,"s1":3,"s2":2,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','2d6']]},
            5:{"bab":3,"fortSave":4,"refSave":1,"willSave":4,"Special":"Channel energy 3d6","s0":4,"s1":3,"s2":2,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','3d6']]},
            6:{"bab":4,"fortSave":5,"refSave":2,"willSave":5,"Special":0,"s0":4,"s1":3,"s2":3,"s3":2,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','3d6']]},
            7:{"bab":5,"fortSave":5,"refSave":2,"willSave":5,"Special":"Channel energy 4d6","s0":4,"s1":4,"s2":3,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','4d6']]},
            8:{"bab":6,"fortSave":6,"refSave":2,"willSave":6,"Special":0,"s0":4,"s1":4,"s2":3,"s3":3,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','4d6']]},
            9:{"bab":6,"fortSave":6,"refSave":3,"willSave":6,"Special":"Channel energy 5d6","s0":4,"s1":4,"s2":4,"s3":3,"s4":2,"s5":1,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','5d6']]},
            10:{"bab":7,"fortSave":7,"refSave":3,"willSave":7,"Special":0,"s0":4,"s1":4,"s2":4,"s3":3,"s4":3,"s5":2,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','5d6']]},
            11:{"bab":8,"fortSave":7,"refSave":3,"willSave":7,"Special":"Channel energy 6d6","s0":4,"s1":4,"s2":4,"s3":4,"s4":3,"s5":2,"s6":1,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','6d6']]},
            12:{"bab":9,"fortSave":8,"refSave":4,"willSave":8,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":3,"s5":3,"s6":2,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','6d6']]},
            13:{"bab":9,"fortSave":8,"refSave":4,"willSave":8,"Special":"Channel energy 7d6","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":3,"s6":2,"s7":1,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','7d6']]},
            14:{"bab":10,"fortSave":9,"refSave":4,"willSave":9,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":3,"s6":3,"s7":2,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','7d6']]},
            15:{"bab":11,"fortSave":9,"refSave":5,"willSave":9,"Special":"Channel energy 8d6","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":3,"s7":2,"s8":1,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','8d6']]},
            16:{"bab":12,"fortSave":10,"refSave":5,"willSave":10,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":3,"s7":3,"s8":2,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','8d6']]},
            17:{"bab":12,"fortSave":10,"refSave":5,"willSave":10,"Special":"Channel energy 9d6","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":3,"s8":2,"s9":1,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','9d6']]},
            18:{"bab":13,"fortSave":11,"refSave":6,"willSave":11,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":3,"s8":3,"s9":2,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','9d6']]},
            19:{"bab":14,"fortSave":11,"refSave":6,"willSave":11,"Special":"Channel energy 10d6","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":4,"s8":3,"s9":3,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','10d6']]},
            20:{"bab":15,"fortSave":12,"refSave":6,"willSave":12,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":4,"s8":4,"s9":4,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["aura"],['channelEnergy','10d6']]},
        }
    },
    'Druid':{'Type':'Core','StartingWealth':2,'AvgStartingGold':70,'RanksLevel':4,'Player':1,'HitDie':8,'AgeCategory':'Trained',
        'skills':{'Acrobatics':0,'Appraise':0,'Bluff':0,'Climb':1,'Craft':1,'Diplomacy':0,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':1,'Handle Animal':1,'Heal':1,'Intimidate':0,'K. Arcana':0,'K. Dungeon':0,'K. Engineering':0,'K. Geography':1,'K. History':0,'K. Local':0,'K. Nature':1,'K. Nobility':0,'K. Planes':0,'K. Religion':0,'Linguistics':0,'Perception':1,'Perform':0,'Profession':1,'Ride':1,'Sense Motive':0,'Sleight of Hand':0,'Spellcraft':1,'Stealth':0,'Survival':1,'Swim':1,'Use Magic Device':0,},
        'level':{
            1:{"bab":0,"fortSave":2,"refSave":0,"willSave":2,"Special":"Nature bond, nature sense, orisons, wild empathy","s0":3,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":1,"fortSave":3,"refSave":0,"willSave":3,"Special":"Woodland stride","s0":4,"s1":2,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":2,"fortSave":3,"refSave":1,"willSave":3,"Special":"Trackless step","s0":4,"s1":2,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":3,"fortSave":4,"refSave":1,"willSave":4,"Special":"Resist nature’s lure, wild shape (1/day)","s0":4,"s1":3,"s2":2,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":3,"fortSave":4,"refSave":1,"willSave":4,"Special":0,"s0":4,"s1":3,"s2":2,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":4,"fortSave":5,"refSave":2,"willSave":5,"Special":"Wild shape (2/day)","s0":4,"s1":3,"s2":3,"s3":2,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":5,"fortSave":5,"refSave":2,"willSave":5,"Special":0,"s0":4,"s1":4,"s2":3,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":6,"fortSave":6,"refSave":2,"willSave":6,"Special":"Wild shape (3/day)","s0":4,"s1":4,"s2":3,"s3":3,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":6,"fortSave":6,"refSave":3,"willSave":6,"Special":"Venom immunity","s0":4,"s1":4,"s2":4,"s3":3,"s4":2,"s5":1,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":7,"fortSave":7,"refSave":3,"willSave":7,"Special":"Wild shape (4/day)","s0":4,"s1":4,"s2":4,"s3":3,"s4":3,"s5":2,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":8,"fortSave":7,"refSave":3,"willSave":7,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":3,"s5":2,"s6":1,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":9,"fortSave":8,"refSave":4,"willSave":8,"Special":"Wild shape (5/day)","s0":4,"s1":4,"s2":4,"s3":4,"s4":3,"s5":3,"s6":2,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":9,"fortSave":8,"refSave":4,"willSave":8,"Special":"A thousand faces","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":3,"s6":2,"s7":1,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":10,"fortSave":9,"refSave":4,"willSave":9,"Special":"Wild shape (6/day)","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":3,"s6":3,"s7":2,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":11,"fortSave":9,"refSave":5,"willSave":9,"Special":"Timeless body","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":3,"s7":2,"s8":1,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":12,"fortSave":10,"refSave":5,"willSave":10,"Special":"Wild shape (7/day)","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":3,"s7":3,"s8":2,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":12,"fortSave":10,"refSave":5,"willSave":10,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":3,"s8":2,"s9":1,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":13,"fortSave":11,"refSave":6,"willSave":11,"Special":"Wild shape (8/day)","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":3,"s8":3,"s9":2,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":14,"fortSave":11,"refSave":6,"willSave":11,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":4,"s8":3,"s9":3,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":15,"fortSave":12,"refSave":6,"willSave":12,"Special":"Wild shape (at will)","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":4,"s8":4,"s9":4,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
    'Fighter':{'Type':'Core','StartingWealth':5,'AvgStartingGold':175,'RanksLevel':2,'Player':1,'HitDie':10,'AgeCategory':'SelfTaught',
        'skills':{'Acrobatics':0,'Appraise':0,'Bluff':0,'Climb':1,'Craft':1,'Diplomacy':0,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':0,'Handle Animal':1,'Heal':0,'Intimidate':1,'K. Arcana':0,'K. Dungeon':1,'K. Engineering':1,'K. Geography':0,'K. History':0,'K. Local':0,'K. Nature':0,'K. Nobility':0,'K. Planes':0,'K. Religion':0,'Linguistics':0,'Perception':0,'Perform':0,'Profession':1,'Ride':1,'Sense Motive':0,'Sleight of Hand':0,'Spellcraft':0,'Stealth':0,'Survival':1,'Swim':1,'Use Magic Device':0,},
        'level':{
            1:{"bab":1,"fortSave":2,"refSave":0,"willSave":0,"Special":"Bonus feat","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":2,"fortSave":3,"refSave":0,"willSave":0,"Special":"Bonus feat, bravery +1","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":3,"fortSave":3,"refSave":1,"willSave":1,"Special":"Armor training","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":4,"fortSave":4,"refSave":1,"willSave":1,"Special":"Bonus feat","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":5,"fortSave":4,"refSave":1,"willSave":1,"Special":"Weapon training","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":6,"fortSave":5,"refSave":2,"willSave":2,"Special":"Bonus feat, bravery +2","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":7,"fortSave":5,"refSave":2,"willSave":2,"Special":"Armor training","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":8,"fortSave":6,"refSave":2,"willSave":2,"Special":"Bonus feat","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":9,"fortSave":6,"refSave":3,"willSave":3,"Special":"Weapon training (or advanced weapon training*)","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":10,"fortSave":7,"refSave":3,"willSave":3,"Special":"Bonus feat, bravery +3","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":11,"fortSave":7,"refSave":3,"willSave":3,"Special":"Armor training","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":12,"fortSave":8,"refSave":4,"willSave":4,"Special":"Bonus feat","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":13,"fortSave":8,"refSave":4,"willSave":4,"Special":"Weapon training","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":14,"fortSave":9,"refSave":4,"willSave":4,"Special":"Bonus feat, bravery +4","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":15,"fortSave":9,"refSave":5,"willSave":5,"Special":"Armor training","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":16,"fortSave":10,"refSave":5,"willSave":5,"Special":"Bonus feat","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":17,"fortSave":10,"refSave":5,"willSave":5,"Special":"Weapon training","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":18,"fortSave":11,"refSave":6,"willSave":6,"Special":"Bonus feat, bravery +5","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":19,"fortSave":11,"refSave":6,"willSave":6,"Special":"Armor mastery","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":20,"fortSave":12,"refSave":6,"willSave":6,"Special":"Bonus feat, Weapon mastery","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
    'Monk':{'Type':'Core','StartingWealth':1,'AvgStartingGold':35,'RanksLevel':4,'Player':1,'HitDie':8,'AgeCategory':'Trained',
        'skills':{'Acrobatics':1,'Appraise':0,'Bluff':0,'Climb':1,'Craft':1,'Diplomacy':0,'Disable Device':0,'Disguise':0,'Escape Artist':1,'Fly':0,'Handle Animal':0,'Heal':0,'Intimidate':1,'K. Arcana':0,'K. Dungeon':0,'K. Engineering':0,'K. Geography':0,'K. History':1,'K. Local':0,'K. Nature':0,'K. Nobility':0,'K. Planes':0,'K. Religion':1,'Linguistics':0,'Perception':1,'Perform':1,'Profession':1,'Ride':1,'Sense Motive':1,'Sleight of Hand':0,'Spellcraft':0,'Stealth':1,'Survival':0,'Swim':1,'Use Magic Device':0,},
        'level':{
            1:{"bab":0,"fortSave":2,"refSave":2,"willSave":2,"Special":"Bonus feat, flurry of blows, stunning fist, unarmed strike","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":-1,"UnarmedDamage":"1d6","ACBonus":0,"FastMovement":0,},
            2:{"bab":1,"fortSave":3,"refSave":3,"willSave":3,"Special":"Bonus feat, evasion","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":0,"UnarmedDamage":"1d6","ACBonus":0,"FastMovement":0,},
            3:{"bab":2,"fortSave":3,"refSave":3,"willSave":3,"Special":"Fast movement, maneuver training, still mind","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":1,"UnarmedDamage":"1d6","ACBonus":0,"FastMovement":10,},
            4:{"bab":3,"fortSave":4,"refSave":4,"willSave":4,"Special":"Ki pool (magic), slow fall 20 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":2,"UnarmedDamage":"1d8","ACBonus":1,"FastMovement":10,},
            5:{"bab":3,"fortSave":4,"refSave":4,"willSave":4,"Special":"High jump, purity of body","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":3,"UnarmedDamage":"1d8","ACBonus":1,"FastMovement":10,},
            6:{"bab":4,"fortSave":5,"refSave":5,"willSave":5,"Special":"Bonus feat, slow fall 30 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":4,"UnarmedDamage":"1d8","ACBonus":1,"FastMovement":20,},
            7:{"bab":5,"fortSave":5,"refSave":5,"willSave":5,"Special":"Ki pool (cold iron/silver), wholeness of body","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":5,"UnarmedDamage":"1d8","ACBonus":1,"FastMovement":20,},
            8:{"bab":6,"fortSave":6,"refSave":6,"willSave":6,"Special":"Slow fall 40 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":6,"UnarmedDamage":"1d10","ACBonus":2,"FastMovement":20,},
            9:{"bab":6,"fortSave":6,"refSave":6,"willSave":6,"Special":"Improved evasion","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":7,"UnarmedDamage":"1d10","ACBonus":2,"FastMovement":30,},
            10:{"bab":7,"fortSave":7,"refSave":7,"willSave":7,"Special":"Bonus feat, Ki pool (lawful), slow fall 50 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":8,"UnarmedDamage":"1d10","ACBonus":2,"FastMovement":30,},
            11:{"bab":8,"fortSave":7,"refSave":7,"willSave":7,"Special":"Diamond body","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":9,"UnarmedDamage":"1d10","ACBonus":2,"FastMovement":30,},
            12:{"bab":9,"fortSave":8,"refSave":8,"willSave":8,"Special":"Abundant step, slow fall 60 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":10,"UnarmedDamage":"2d6","ACBonus":3,"FastMovement":40,},
            13:{"bab":9,"fortSave":8,"refSave":8,"willSave":8,"Special":"Diamond soul","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":11,"UnarmedDamage":"2d6","ACBonus":3,"FastMovement":40,},
            14:{"bab":10,"fortSave":9,"refSave":9,"willSave":9,"Special":"Bonus feat, slow fall 70 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":12,"UnarmedDamage":"2d6","ACBonus":3,"FastMovement":40,},
            15:{"bab":11,"fortSave":9,"refSave":9,"willSave":9,"Special":"Quivering palm","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":13,"UnarmedDamage":"2d6","ACBonus":3,"FastMovement":50,},
            16:{"bab":12,"fortSave":10,"refSave":10,"willSave":10,"Special":"Ki pool (adamantine), slow fall 80 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":14,"UnarmedDamage":"2d8","ACBonus":4,"FastMovement":50,},
            17:{"bab":12,"fortSave":10,"refSave":10,"willSave":10,"Special":"Timeless body, tongue of the sun and moon","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":15,"UnarmedDamage":"2d8","ACBonus":4,"FastMovement":50,},
            18:{"bab":13,"fortSave":11,"refSave":11,"willSave":11,"Special":"Bonus feat, slow fall 90 ft.","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":16,"UnarmedDamage":"2d8","ACBonus":4,"FastMovement":60,},
            19:{"bab":14,"fortSave":11,"refSave":11,"willSave":11,"Special":"Empty body","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":17,"UnarmedDamage":"2d8","ACBonus":4,"FastMovement":60,},
            20:{"bab":15,"fortSave":12,"refSave":12,"willSave":12,"Special":"Perfect self, slow fall any distance","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":18,"UnarmedDamage":"2d10","ACBonus":5,"FastMovement":60,},
        }
    },
    'Paladin':{'Type':'Core','StartingWealth':5,'AvgStartingGold':175,'RanksLevel':2,'Player':1,'HitDie':10,'AgeCategory':'SelfTaught',
        'skills':{'Acrobatics':0,'Appraise':0,'Bluff':0,'Climb':0,'Craft':1,'Diplomacy':1,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':0,'Handle Animal':1,'Heal':1,'Intimidate':0,'K. Arcana':0,'K. Dungeon':0,'K. Engineering':0,'K. Geography':0,'K. History':0,'K. Local':0,'K. Nature':0,'K. Nobility':1,'K. Planes':0,'K. Religion':1,'Linguistics':0,'Perception':0,'Perform':0,'Profession':1,'Ride':1,'Sense Motive':1,'Sleight of Hand':0,'Spellcraft':1,'Stealth':0,'Survival':0,'Swim':0,'Use Magic Device':0,},
        'level':{
            1:{"bab":1,"fortSave":2,"refSave":0,"willSave":2,"Special":"Aura of good, detect evil, smite evil 1/day","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":2,"fortSave":3,"refSave":0,"willSave":3,"Special":"Divine grace, lay on hands","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":3,"fortSave":3,"refSave":1,"willSave":3,"Special":"Aura of courage, divine health, mercy","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":4,"fortSave":4,"refSave":1,"willSave":4,"Special":"Channel positive energy, smite evil 2/day","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":5,"fortSave":4,"refSave":1,"willSave":4,"Special":"Divine bond","s0":0,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":6,"fortSave":5,"refSave":2,"willSave":5,"Special":"Mercy","s0":0,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":7,"fortSave":5,"refSave":2,"willSave":5,"Special":"Smite evil 3/day","s0":0,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":8,"fortSave":6,"refSave":2,"willSave":6,"Special":"Aura of resolve","s0":0,"s1":1,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":9,"fortSave":6,"refSave":3,"willSave":6,"Special":"Mercy","s0":0,"s1":2,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":10,"fortSave":7,"refSave":3,"willSave":7,"Special":"Smite evil 4/day","s0":0,"s1":2,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":11,"fortSave":7,"refSave":3,"willSave":7,"Special":"Aura of justice","s0":0,"s1":2,"s2":1,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":12,"fortSave":8,"refSave":4,"willSave":8,"Special":"Mercy","s0":0,"s1":2,"s2":2,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":13,"fortSave":8,"refSave":4,"willSave":8,"Special":"Smite evil 5/day","s0":0,"s1":3,"s2":2,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":14,"fortSave":9,"refSave":4,"willSave":9,"Special":"Aura of faith","s0":0,"s1":3,"s2":2,"s3":1,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":15,"fortSave":9,"refSave":5,"willSave":9,"Special":"Mercy","s0":0,"s1":3,"s2":2,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":16,"fortSave":10,"refSave":5,"willSave":10,"Special":"Smite evil 6/day","s0":0,"s1":3,"s2":3,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":17,"fortSave":10,"refSave":5,"willSave":10,"Special":"Aura of righteousness","s0":0,"s1":4,"s2":3,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":18,"fortSave":11,"refSave":6,"willSave":11,"Special":"Mercy","s0":0,"s1":4,"s2":3,"s3":2,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":19,"fortSave":11,"refSave":6,"willSave":11,"Special":"Smite evil 7/day","s0":0,"s1":4,"s2":3,"s3":3,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":20,"fortSave":12,"refSave":6,"willSave":12,"Special":"Holy champion","s0":0,"s1":4,"s2":4,"s3":3,"s4":3,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
    'Ranger':{'Type':'Core','StartingWealth':5,'AvgStartingGold':175,'RanksLevel':6,'Player':1,'HitDie':10,'AgeCategory':'SelfTaught',
        'skills':{'Acrobatics':0,'Appraise':0,'Bluff':0,'Climb':1,'Craft':1,'Diplomacy':0,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':0,'Handle Animal':1,'Heal':1,'Intimidate':1,'K. Arcana':0,'K. Dungeon':1,'K. Engineering':0,'K. Geography':1,'K. History':0,'K. Local':0,'K. Nature':1,'K. Nobility':0,'K. Planes':0,'K. Religion':0,'Linguistics':0,'Perception':1,'Perform':0,'Profession':1,'Ride':1,'Sense Motive':0,'Sleight of Hand':0,'Spellcraft':1,'Stealth':1,'Survival':1,'Swim':1,'Use Magic Device':0,},
        'level':{
            1:{"bab":1,"fortSave":2,"refSave":2,"willSave":0,"Special":"1st favored enemy, track, wild empathy","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":2,"fortSave":3,"refSave":3,"willSave":0,"Special":"Combat style feat","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":3,"fortSave":3,"refSave":3,"willSave":1,"Special":"Endurance, 1st favored terrain","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":4,"fortSave":4,"refSave":4,"willSave":1,"Special":"Hunter’s bond","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":5,"fortSave":4,"refSave":4,"willSave":1,"Special":"2nd favored enemy","s0":0,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":6,"fortSave":5,"refSave":5,"willSave":2,"Special":"Combat style feat","s0":0,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":7,"fortSave":5,"refSave":5,"willSave":2,"Special":"Woodland stride","s0":0,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":8,"fortSave":6,"refSave":6,"willSave":2,"Special":"Swift tracker, 2nd favored terrain","s0":0,"s1":1,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":9,"fortSave":6,"refSave":6,"willSave":3,"Special":"Evasion","s0":0,"s1":2,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":10,"fortSave":7,"refSave":7,"willSave":3,"Special":"3rd favored enemy, combat style feat","s0":0,"s1":2,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":11,"fortSave":7,"refSave":7,"willSave":3,"Special":"Quarry","s0":0,"s1":2,"s2":1,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":12,"fortSave":8,"refSave":8,"willSave":4,"Special":"Camouflage","s0":0,"s1":2,"s2":2,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":13,"fortSave":8,"refSave":8,"willSave":4,"Special":"3rd favored terrain","s0":0,"s1":3,"s2":2,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":14,"fortSave":9,"refSave":9,"willSave":4,"Special":"Combat style feat","s0":0,"s1":3,"s2":2,"s3":1,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":15,"fortSave":9,"refSave":9,"willSave":5,"Special":"4th favored enemy","s0":0,"s1":3,"s2":2,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":16,"fortSave":10,"refSave":10,"willSave":5,"Special":"Improved evasion","s0":0,"s1":3,"s2":3,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":17,"fortSave":10,"refSave":10,"willSave":5,"Special":"Hide in plain sight","s0":0,"s1":4,"s2":3,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":18,"fortSave":11,"refSave":11,"willSave":6,"Special":"4th favored terrain, combat style feat","s0":0,"s1":4,"s2":3,"s3":2,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":19,"fortSave":11,"refSave":11,"willSave":6,"Special":"Improved quarry","s0":0,"s1":4,"s2":3,"s3":3,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":20,"fortSave":12,"refSave":12,"willSave":6,"Special":"5th favored enemy, master hunter","s0":0,"s1":4,"s2":4,"s3":3,"s4":3,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
    'Rogue':{'Type':'Core','StartingWealth':4,'AvgStartingGold':140,'RanksLevel':8,'Player':1,'HitDie':8,'AgeCategory':'Intuitive',
        'skills':{'Acrobatics':1,'Appraise':1,'Bluff':1,'Climb':1,'Craft':1,'Diplomacy':1,'Disable Device':1,'Disguise':1,'Escape Artist':1,'Fly':0,'Handle Animal':0,'Heal':0,'Intimidate':1,'K. Arcana':0,'K. Dungeon':1,'K. Engineering':0,'K. Geography':0,'K. History':0,'K. Local':1,'K. Nature':0,'K. Nobility':0,'K. Planes':0,'K. Religion':0,'Linguistics':1,'Perception':1,'Perform':1,'Profession':1,'Ride':0,'Sense Motive':1,'Sleight of Hand':1,'Spellcraft':0,'Stealth':1,'Survival':0,'Swim':1,'Use Magic Device':1,},
        'level':{
            1:{"bab":0,"fortSave":0,"refSave":2,"willSave":0,"Special":"Sneak attack +1d6, trapfinding","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","1d6"],["trapFinding"]]},
            2:{"bab":1,"fortSave":0,"refSave":3,"willSave":0,"Special":"Evasion, rogue talent","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","1d6"],["trapFinding"],["evasion"]]},
            3:{"bab":2,"fortSave":1,"refSave":3,"willSave":1,"Special":"Sneak attack +2d6, trap sense +1","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","2d6"],["trapFinding"],["evasion"],["trapSnese",1]]},
            4:{"bab":3,"fortSave":1,"refSave":4,"willSave":1,"Special":"Rogue talent, uncanny dodge","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","2d6"],["trapFinding"],["evasion"],["trapSense",1],["uncannyDodge"]]},
            5:{"bab":3,"fortSave":1,"refSave":4,"willSave":1,"Special":"Sneak attack +3d6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","3d6"],["trapFinding"],["evasion"],["trapSense",1],["uncannyDodge"]]},
            6:{"bab":4,"fortSave":2,"refSave":5,"willSave":2,"Special":"Rogue talent, trap sense +2","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","3d6"],["trapFinding"],["evasion"],["trapSense",2],["uncannyDodge"]]},
            7:{"bab":5,"fortSave":2,"refSave":5,"willSave":2,"Special":"Sneak attack +4d6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","4d6"],["trapFinding"],["evasion"],["trapSense",2],["uncannyDodge"]]},
            8:{"bab":6,"fortSave":2,"refSave":6,"willSave":2,"Special":"Improved uncanny dodge, rogue talent","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","4d6"],["trapFinding"],["evasion"],["trapSense",3],["uncannyDodge"],["improvedUncannyDodge"]]},
            9:{"bab":6,"fortSave":3,"refSave":6,"willSave":3,"Special":"Sneak attack +5d6, trap sense +3","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","5d6"],["trapFinding"],["evasion"],["trapSense",3],["uncannyDodge"],["improvedUncannyDodge"]]},
            10:{"bab":7,"fortSave":3,"refSave":7,"willSave":3,"Special":"Advanced talents, rogue talent","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","5d6"],["trapFinding"],["evasion"],["trapSense",3],["uncannyDodge"],["improvedUncannyDodge"]]},
            11:{"bab":8,"fortSave":3,"refSave":7,"willSave":3,"Special":"Sneak attack +6d6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","6d6"],["trapFinding"],["evasion"],["trapSense",3],["uncannyDodge"],["improvedUncannyDodge"]]},
            12:{"bab":9,"fortSave":4,"refSave":8,"willSave":4,"Special":"Rogue talent, trap sense +4","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","6d6"],["trapFinding"],["evasion"],["trapSense",4],["uncannyDodge"],["improvedUncannyDodge"]]},
            13:{"bab":9,"fortSave":4,"refSave":8,"willSave":4,"Special":"Sneak attack +7d6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","7d6"],["trapFinding"],["evasion"],["trapSense",4],["uncannyDodge"],["improvedUncannyDodge"]]},
            14:{"bab":10,"fortSave":4,"refSave":9,"willSave":4,"Special":"Rogue talent","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","7d6"],["trapFinding"],["evasion"],["trapSense",4],["uncannyDodge"],["improvedUncannyDodge"]]},
            15:{"bab":11,"fortSave":5,"refSave":9,"willSave":5,"Special":"Sneak attack +8d6, trap sense +5","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","8d6"],["trapFinding"],["evasion"],["trapSense",5],["uncannyDodge"],["improvedUncannyDodge"]]},
            16:{"bab":12,"fortSave":5,"refSave":10,"willSave":5,"Special":"Rogue talent","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","8d6"],["trapFinding"],["evasion"],["trapSense",5],["uncannyDodge"],["improvedUncannyDodge"]]},
            17:{"bab":12,"fortSave":5,"refSave":10,"willSave":5,"Special":"Sneak attack +9d6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","9d6"],["trapFinding"],["evasion"],["trapSense",5],["uncannyDodge"],["improvedUncannyDodge"]]},
            18:{"bab":13,"fortSave":6,"refSave":11,"willSave":6,"Special":"Rogue talent, trap sense +6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","9d6"],["trapFinding"],["evasion"],["trapSense",6],["uncannyDodge"],["improvedUncannyDodge"]]},
            19:{"bab":14,"fortSave":6,"refSave":11,"willSave":6,"Special":"Sneak attack +10d6","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","10d6"],["trapFinding"],["evasion"],["trapSense",6],["uncannyDodge"],["improvedUncannyDodge"]]},
            20:{"bab":15,"fortSave":6,"refSave":12,"willSave":6,"Special":"Master strike, rogue talent","s0":0,"s1":0,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"","scripts":[["sneakAttack","10d6"],["trapFinding"],["evasion"],["trapSense",6],["uncannyDodge"],["improvedUncannyDodge"],["masterStrike"]]},
        }
    },
    'Sorcerer':{'Type':'Core','StartingWealth':2,'AvgStartingGold':70,'RanksLevel':2,'Player':1,'HitDie':6,'AgeCategory':'Intuitive',
        'skills':{'Acrobatics':0,'Appraise':1,'Bluff':1,'Climb':0,'Craft':1,'Diplomacy':0,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':1,'Handle Animal':0,'Heal':0,'Intimidate':1,'K. Arcana':1,'K. Dungeon':0,'K. Engineering':0,'K. Geography':0,'K. History':0,'K. Local':0,'K. Nature':0,'K. Nobility':0,'K. Planes':0,'K. Religion':0,'Linguistics':0,'Perception':0,'Perform':0,'Profession':1,'Ride':0,'Sense Motive':0,'Sleight of Hand':0,'Spellcraft':1,'Stealth':0,'Survival':0,'Swim':0,'Use Magic Device':1,},
        'level':{
            1:{"bab":0,"fortSave":0,"refSave":0,"willSave":2,"Special":"Bloodline power, cantrips, eschew materials","s0":0,"s1":3,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":1,"fortSave":0,"refSave":0,"willSave":3,"Special":0,"s0":0,"s1":4,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":1,"fortSave":1,"refSave":1,"willSave":3,"Special":"Bloodline power, bloodline spell","s0":0,"s1":5,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":2,"fortSave":1,"refSave":1,"willSave":4,"Special":0,"s0":0,"s1":6,"s2":3,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":2,"fortSave":1,"refSave":1,"willSave":4,"Special":"Bloodline spell","s0":0,"s1":6,"s2":4,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":3,"fortSave":2,"refSave":2,"willSave":5,"Special":0,"s0":0,"s1":6,"s2":5,"s3":3,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":3,"fortSave":2,"refSave":2,"willSave":5,"Special":"Bloodline feat, bloodline spell","s0":0,"s1":6,"s2":6,"s3":4,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":4,"fortSave":2,"refSave":2,"willSave":6,"Special":0,"s0":0,"s1":6,"s2":6,"s3":5,"s4":3,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":4,"fortSave":3,"refSave":3,"willSave":6,"Special":"Bloodline power, bloodline spell","s0":0,"s1":6,"s2":6,"s3":6,"s4":4,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":5,"fortSave":3,"refSave":3,"willSave":7,"Special":0,"s0":0,"s1":6,"s2":6,"s3":6,"s4":5,"s5":3,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":5,"fortSave":3,"refSave":3,"willSave":7,"Special":"Bloodline spell","s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":4,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":6,"fortSave":4,"refSave":4,"willSave":8,"Special":0,"s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":5,"s6":3,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":6,"fortSave":4,"refSave":4,"willSave":8,"Special":"Bloodline feat, bloodline spell","s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":4,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":7,"fortSave":4,"refSave":4,"willSave":9,"Special":0,"s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":5,"s7":3,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":7,"fortSave":5,"refSave":5,"willSave":9,"Special":"Bloodline power, bloodline spell","s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":6,"s7":4,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":8,"fortSave":5,"refSave":5,"willSave":10,"Special":0,"s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":6,"s7":5,"s8":3,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":8,"fortSave":5,"refSave":5,"willSave":10,"Special":"Bloodline spell","s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":6,"s7":6,"s8":4,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":9,"fortSave":6,"refSave":6,"willSave":11,"Special":0,"s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":6,"s7":6,"s8":5,"s9":3,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":9,"fortSave":6,"refSave":6,"willSave":11,"Special":"Bloodline feat, bloodline spell","s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":6,"s7":6,"s8":6,"s9":4,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":10,"fortSave":6,"refSave":6,"willSave":12,"Special":"Bloodline power","s0":0,"s1":6,"s2":6,"s3":6,"s4":6,"s5":6,"s6":6,"s7":6,"s8":6,"s9":6,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
    'Wizard':{'Type':'Core','StartingWealth':2,'AvgStartingGold':70,'RanksLevel':2,'Player':1,'HitDie':6,'AgeCategory':'Trained',
        'skills':{'Acrobatics':0,'Appraise':1,'Bluff':0,'Climb':0,'Craft':1,'Diplomacy':0,'Disable Device':0,'Disguise':0,'Escape Artist':0,'Fly':1,'Handle Animal':0,'Heal':0,'Intimidate':0,'K. Arcana':1,'K. Dungeon':1,'K. Engineering':1,'K. Geography':1,'K. History':1,'K. Local':1,'K. Nature':1,'K. Nobility':1,'K. Planes':1,'K. Religion':1,'Linguistics':1,'Perception':0,'Perform':0,'Profession':1,'Ride':0,'Sense Motive':0,'Sleight of Hand':0,'Spellcraft':1,'Stealth':0,'Survival':0,'Swim':0,'Use Magic Device':0,},
        'level':{
            1:{"bab":0,"fortSave":0,"refSave":0,"willSave":2,"Special":"Arcane bond, arcane school, cantrips, Scribe Scroll","s0":3,"s1":1,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            2:{"bab":1,"fortSave":0,"refSave":0,"willSave":3,"Special":0,"s0":4,"s1":2,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            3:{"bab":1,"fortSave":1,"refSave":1,"willSave":3,"Special":0,"s0":4,"s1":2,"s2":1,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            4:{"bab":2,"fortSave":1,"refSave":1,"willSave":4,"Special":0,"s0":4,"s1":3,"s2":2,"s3":0,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            5:{"bab":2,"fortSave":1,"refSave":1,"willSave":4,"Special":"Bonus feat","s0":4,"s1":3,"s2":2,"s3":1,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            6:{"bab":3,"fortSave":2,"refSave":2,"willSave":5,"Special":0,"s0":4,"s1":3,"s2":3,"s3":2,"s4":0,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            7:{"bab":3,"fortSave":2,"refSave":2,"willSave":5,"Special":0,"s0":4,"s1":4,"s2":3,"s3":2,"s4":1,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            8:{"bab":4,"fortSave":2,"refSave":2,"willSave":6,"Special":0,"s0":4,"s1":4,"s2":3,"s3":3,"s4":2,"s5":0,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            9:{"bab":4,"fortSave":3,"refSave":3,"willSave":6,"Special":0,"s0":4,"s1":4,"s2":4,"s3":3,"s4":2,"s5":1,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            10:{"bab":5,"fortSave":3,"refSave":3,"willSave":7,"Special":"Bonus feat","s0":4,"s1":4,"s2":4,"s3":3,"s4":3,"s5":2,"s6":0,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            11:{"bab":5,"fortSave":3,"refSave":3,"willSave":7,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":3,"s5":2,"s6":1,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            12:{"bab":6,"fortSave":4,"refSave":4,"willSave":8,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":3,"s5":3,"s6":2,"s7":0,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            13:{"bab":6,"fortSave":4,"refSave":4,"willSave":8,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":3,"s6":2,"s7":1,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            14:{"bab":7,"fortSave":4,"refSave":4,"willSave":9,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":3,"s6":3,"s7":2,"s8":0,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            15:{"bab":7,"fortSave":5,"refSave":5,"willSave":9,"Special":"Bonus feat","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":3,"s7":2,"s8":1,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            16:{"bab":8,"fortSave":5,"refSave":5,"willSave":10,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":3,"s7":3,"s8":2,"s9":0,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            17:{"bab":8,"fortSave":5,"refSave":5,"willSave":10,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":3,"s8":2,"s9":1,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            18:{"bab":9,"fortSave":6,"refSave":6,"willSave":11,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":3,"s8":3,"s9":2,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            19:{"bab":9,"fortSave":6,"refSave":6,"willSave":11,"Special":0,"s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":4,"s8":3,"s9":3,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
            20:{"bab":10,"fortSave":6,"refSave":6,"willSave":12,"Special":"Bonus feat","s0":4,"s1":4,"s2":4,"s3":4,"s4":4,"s5":4,"s6":4,"s7":4,"s8":4,"s9":4,"FlurryofBlowsAttackBonus":"","UnarmedDamage":"","ACBonus":"","FastMovement":"",},
        }
    },
}
var raceData = {
    'Dwarf':{'con':2,'wis':2,'cha':-2,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'dwarf','Speed':20,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Dwarven','Senses':'Darkvision 60 ft.','Defensive Traits':'AC bonus, Saving Throw bonus, CMD bonus','Offensive Traits':'Attack bonus, weapon familiarity','Skill Bonuses':'Appraise, Perception','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':11,'Source':'Core','BaseAge':40,'Intuitive':'3d6','SelfTaught':'5d6','Trained':'7d6','mHeight':45,'mHeightMod':'2d4','mWeight':150,'mWeightMod':'14d4','fHeight':43,'fHeightMod':'2d4','fWeight':120,'fWeightMod':'14d4','scripts':[]},
    'Elf':{'con':0,'wis':0,'cha':0,'dex':2,'str':-2,'int':2,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'elf','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Elven','Senses':'Low-light vision','Defensive Traits':'Elven immunities','Offensive Traits':'Weapon familiarity','Skill Bonuses':'Perception','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':10,'Source':'Core','BaseAge':110,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'10d6','mHeight':64,'mHeightMod':'2d8','mWeight':110,'mWeightMod':'6d8','fHeight':64,'fHeightMod':'2d6','fWeight':90,'fWeightMod':'6d6','scripts':[]},
    'Gnome':{'con':2,'wis':0,'cha':2,'dex':0,'str':-2,'int':0,'any':0,'Size':'Small','Type':'Humanoid','Subtype':'gnome','Speed':20,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Gnome, Sylvan','Senses':'Low-light vision','Defensive Traits':'Defensive training, illusion resistance','Offensive Traits':'Hatred, weapon familiarity','Skill Bonuses':'Perception, Craft or Profession','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'dancing lights, ghost sound, prestidigitation','Race Points':10,'Source':'Core','BaseAge':40,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'9d6','mHeight':36,'mHeightMod':'2d4','mWeight':35,'mWeightMod':'2d4','fHeight':34,'fHeightMod':'2d4','fWeight':30,'fWeightMod':'2d4','scripts':[]},
    'Half-elf':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'elf, human','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Elven','Senses':'Low-light vision','Defensive Traits':'Elven immunities','Offensive Traits':'','Skill Bonuses':'Perception','Bonus Feats':'Skill Focus','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':10,'Source':'Core','BaseAge':20,'Intuitive':'1d6','SelfTaught':'2d6','Trained':'3d6','mHeight':62,'mHeightMod':'2d8','mWeight':100,'mWeightMod':'10d8','fHeight':60,'fHeightMod':'2d8','fWeight':90,'fWeightMod':'10d8','scripts':[]},
    'Halfling':{'con':0,'wis':0,'cha':2,'dex':2,'str':-2,'int':0,'any':0,'Size':'Small','Type':'Humanoid','Subtype':'halfling','Speed':20,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Halfling','Senses':'','Defensive Traits':'Fearless, halfling luck','Offensive Traits':'Weapon familiarity','Skill Bonuses':'Perception, Acrobatics, Climb','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':9,'Source':'Core','BaseAge':20,'Intuitive':'2d6','SelfTaught':'3d6','Trained':'4d6','mHeight':32,'mHeightMod':'2d4','mWeight':30,'mWeightMod':'2d4','fHeight':30,'fHeightMod':'2d4','fWeight':25,'fWeightMod':'2d4','scripts':[]},
    'Half-orc':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'human, orc','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Orc','Senses':'Darkvision','Defensive Traits':'','Offensive Traits':'Orc ferocity, weapon familiarity','Skill Bonuses':'Intimidate','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':8,'Source':'Core','BaseAge':14,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':58,'mHeightMod':'2d12','mWeight':150,'mWeightMod':'14d12','fHeight':53,'fHeightMod':'2d12','fWeight':110,'fWeightMod':'14d12','scripts':[]},
    'Human':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':2,'Size':'Medium','Type':'Humanoid','Subtype':'human','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common','Senses':'','Defensive Traits':'','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'Any one','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':9,'Source':'Core','BaseAge':15,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':58,'mHeightMod':'2d10','mWeight':120,'mWeightMod':'10d10','fHeight':53,'fHeightMod':'2d10','fWeight':85,'fWeightMod':'10d10','scripts':[]},
    'Catfolk':{'con':-2,'wis':0,'cha':2,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'catfolk','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Catfolk','Senses':'Low-light vision','Defensive Traits':'Cat‘s luck','Offensive Traits':'Sprinter','Skill Bonuses':'Perception, Stealth, Survival','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':9,'Source':'Featured','BaseAge':15,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':58,'mHeightMod':'2d8','mWeight':120,'mWeightMod':'10d8','fHeight':53,'fHeightMod':'2d8','fWeight':85,'fWeightMod':'10d8','scripts':[]},
    'Dhampir':{'con':-2,'wis':0,'cha':2,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'dhampir','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common','Senses':'Low-light vision, darkvision, light sensitivity','Defensive Traits':'Undead resistance, resist level drain','Offensive Traits':'','Skill Bonuses':'Bluff, Perception','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'detect undead','Race Points':11,'Source':'Featured','BaseAge':20,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'10d6','mHeight':58,'mHeightMod':'2d10','mWeight':120,'mWeightMod':'10d10','fHeight':53,'fHeightMod':'2d10','fWeight':85,'fWeightMod':'10d10','scripts':[]},
    'Drow':{'con':0,'wis':-2,'cha':2,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'elf','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Elven, Undercommon','Senses':'Superior darkvision, light blindness','Defensive Traits':'Elven immunities, spell resistance','Offensive Traits':'Poison use, weapon familiarity','Skill Bonuses':'Perception','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'dancing lights, darkness, faerie fire','Race Points':14,'Source':'Featured','BaseAge':110,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'10d6','mHeight':64,'mHeightMod':'2d6','mWeight':90,'mWeightMod':'10d6','fHeight':64,'fHeightMod':'2d8','fWeight':110,'fWeightMod':'10d8','scripts':[]},
    'Fetchling':{'con':0,'wis':-2,'cha':2,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Outsider','Subtype':'native','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common','Senses':'Darkvision, low-light vision','Defensive Traits':'Shadow blending, shadowy resistance','Offensive Traits':'','Skill Bonuses':'Knowledge (planes), Stealth','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'disguise self, shadow walk, plane shift','Race Points':17,'Source':'Featured','BaseAge':20,'Intuitive':'1d6','SelfTaught':'2d6','Trained':'3d6','mHeight':64,'mHeightMod':'2d6','mWeight':90,'mWeightMod':'6d6','fHeight':62,'fHeightMod':'2d6','fWeight':80,'fWeightMod':'6d6','scripts':[]},
    'Goblin':{'con':0,'wis':0,'cha':-2,'dex':4,'str':-2,'int':0,'any':0,'Size':'Small','Type':'Humanoid','Subtype':'goblinoid','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Goblin','Senses':'Darkvision','Defensive Traits':'','Offensive Traits':'','Skill Bonuses':'Ride, Stealth','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':10,'Source':'Featured','BaseAge':12,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':32,'mHeightMod':'2d4','mWeight':30,'mWeightMod':'2d4','fHeight':30,'fHeightMod':'2d4','fWeight':25,'fWeightMod':'2d4','scripts':[]},
    'Hobgoblin':{'con':2,'wis':0,'cha':0,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'goblinoid','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Goblin','Senses':'Darkvision','Defensive Traits':'','Offensive Traits':'','Skill Bonuses':'Stealth','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':9,'Source':'Featured','BaseAge':15,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':50,'mHeightMod':'2d8','mWeight':165,'mWeightMod':'10d8','fHeight':48,'fHeightMod':'2d8','fWeight':145,'fWeightMod':'10d8','scripts':[['darkvision',60],['raceSneaky']]},
    'Ifrit':{'con':0,'wis':-2,'cha':2,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Outsider','Subtype':'native','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Ignan','Senses':'Darkvision','Defensive Traits':'Energy resistance','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'burning hands','Race Points':6,'Source':'Featured','BaseAge':60,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'8d6','mHeight':62,'mHeightMod':'2d8','mWeight':110,'mWeightMod':'10d8','fHeight':60,'fHeightMod':'2d8','fWeight':90,'fWeightMod':'10d8','scripts':[]},
    'Kobold':{'con':-2,'wis':0,'cha':0,'dex':2,'str':-4,'int':0,'any':0,'Size':'Small','Type':'Humanoid','Subtype':'reptilian','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Draconic','Senses':'Darkvision, light sensitivity','Defensive Traits':'Armor','Offensive Traits':'','Skill Bonuses':'Craft (trapmaking), Perception, Profession (miner)','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':5,'Source':'Featured','BaseAge':12,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':30,'mHeightMod':'2d4','mWeight':25,'mWeightMod':'2d4','fHeight':28,'fHeightMod':'2d4','fWeight':20,'fWeightMod':'2d4','scripts':[]},
    'Orc':{'con':0,'wis':-2,'cha':-2,'dex':0,'str':4,'int':-2,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'orc','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Orc','Senses':'Darkvision, light sensitivity','Defensive Traits':'','Offensive Traits':'Ferocity, weapon familiarity','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':8,'Source':'Featured','BaseAge':12,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':61,'mHeightMod':'2d12','mWeight':160,'mWeightMod':'14d12','fHeight':57,'fHeightMod':'2d12','fWeight':120,'fWeightMod':'14d12','scripts':[]},
    'Oread':{'con':0,'wis':2,'cha':-2,'dex':0,'str':2,'int':0,'any':0,'Size':'Medium','Type':'Outsider','Subtype':'native','Speed':20,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Terran','Senses':'Darkvision','Defensive Traits':'Energy resistance (acid 5)','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'magic stone','Race Points':6,'Source':'Featured','BaseAge':60,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'8d6','mHeight':48,'mHeightMod':'2d6','mWeight':150,'mWeightMod':'14d6','fHeight':45,'fHeightMod':'2d6','fWeight':120,'fWeightMod':'14d6','scripts':[]},
    'Ratfolk':{'con':0,'wis':0,'cha':0,'dex':2,'str':-2,'int':2,'any':0,'Size':'Small','Type':'Humanoid','Subtype':'ratfolk','Speed':20,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common','Senses':'Darkvision','Defensive Traits':'','Offensive Traits':'Swarming','Skill Bonuses':'Craft (alchemy), Handle Animal (+4), Perception, Use Magic Device','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':9,'Source':'Featured','BaseAge':12,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':43,'mHeightMod':'2d4','mWeight':65,'mWeightMod':'6d4','fHeight':40,'fHeightMod':'2d4','fWeight':50,'fWeightMod':'6d4','scripts':[]},
    'Sylph':{'con':-2,'wis':0,'cha':0,'dex':2,'str':0,'int':2,'any':0,'Size':'Medium','Type':'Outsider','Subtype':'native','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Auran','Senses':'Darkvision','Defensive Traits':'Energy resistance (electricity 5)','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'feather fall','Race Points':6,'Source':'Featured','BaseAge':60,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'8d6','mHeight':62,'mHeightMod':'2d8','mWeight':100,'mWeightMod':'10d8','fHeight':60,'fHeightMod':'2d8','fWeight':90,'fWeightMod':'10d8','scripts':[]},
    'Tengu':{'naturalAttacks':['Bite'],'con':-2,'wis':2,'cha':0,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'tengu','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Tengu','Senses':'Low-light vision','Defensive Traits':'','Offensive Traits':'Swordtrained, natural weapon (bite)','Skill Bonuses':'Linguistics (+4), Perception, Stealth','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':13,'Source':'Featured','BaseAge':15,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':48,'mHeightMod':'2d6','mWeight':65,'mWeightMod':'6d6','fHeight':46,'fHeightMod':'2d6','fWeight':55,'fWeightMod':'6d6','scripts':[]},
    'Tiefling':{'con':0,'wis':0,'cha':-2,'dex':2,'str':0,'int':2,'any':0,'Size':'Medium','Type':'Outsider','Subtype':'native','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Abyssal or Infernal','Senses':'Darkvision','Defensive Traits':'Fiendish resistance','Offensive Traits':'','Skill Bonuses':'Bluff, Stealth','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'darkness','Race Points':13,'Source':'Featured','BaseAge':60,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'8d6','mHeight':58,'mHeightMod':'2d10','mWeight':120,'mWeightMod':'10d10','fHeight':53,'fHeightMod':'2d10','fWeight':85,'fWeightMod':'10d10','scripts':[]},
    'Undine':{'con':0,'wis':2,'cha':0,'dex':2,'str':-2,'int':0,'any':0,'Size':'Medium','Type':'Outsider','Subtype':'native','Speed':30,'Swim':30,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Aquan','Senses':'Darkvision','Defensive Traits':'Energy resistance (cold 5)','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'hydraulic push','Race Points':7,'Source':'Featured','BaseAge':60,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'8d6','mHeight':58,'mHeightMod':'2d10','mWeight':120,'mWeightMod':'10d10','fHeight':53,'fHeightMod':'2d10','fWeight':85,'fWeightMod':'10d10','scripts':[]},
    'Duergar':{'con':2,'wis':2,'cha':-4,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'dwarf','Speed':20,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Dwarven, Undercommon','Senses':'Superior darkvision, light sensitivity','Defensive Traits':'Duergar immunities, stability','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'enlarge person, invisibility','Race Points':8,'Source':'Uncommon','BaseAge':40,'Intuitive':'3d6','SelfTaught':'5d6','Trained':'7d6','mHeight':45,'mHeightMod':'2d4','mWeight':150,'mWeightMod':'14d8','fHeight':43,'fHeightMod':'2d4','fWeight':120,'fWeightMod':'14d8','scripts':[]},
    'Gillman':{'con':2,'wis':-2,'cha':2,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'aquatic','Speed':30,'Swim':30,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Aboleth','Senses':'','Defensive Traits':'Enchantment resistance','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':'','Source':'Uncommon','BaseAge':20,'Intuitive':'1d6','SelfTaught':'2d6','Trained':'3d6','mHeight':58,'mHeightMod':'2d10','mWeight':120,'mWeightMod':'10d10','fHeight':53,'fHeightMod':'2d10','fWeight':85,'fWeightMod':'10d10','scripts':[]},
    'Grippli':{'con':0,'wis':2,'cha':0,'dex':2,'str':-2,'int':0,'any':0,'Size':'Small','Type':'Humanoid','Subtype':'grippli','Speed':30,'Swim':0,'Climb':20,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Grippli','Senses':'Darkvision','Defensive Traits':'Swamp stride','Offensive Traits':'Weapon familiarity','Skill Bonuses':'Stealth (+4)','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':6,'Source':'Uncommon','BaseAge':12,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':19,'mHeightMod':'2d4','mWeight':25,'mWeightMod':'2d4','fHeight':17,'fHeightMod':'2d4','fWeight':20,'fWeightMod':'2d4','scripts':[]},
    'Kitsune':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'kitsune, shapechanger','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Sylvan','Senses':'Low-light vision','Defensive Traits':'','Offensive Traits':'Natural weapon (bite)','Skill Bonuses':'Acrobatics','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'change shape, dancing lights','Race Points':'','Source':'Uncommon','BaseAge':15,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':58,'mHeightMod':'2d8','mWeight':100,'mWeightMod':'10d8','fHeight':53,'fHeightMod':'2d8','fWeight':85,'fWeightMod':'10d8','scripts':[]},
    'Merfolk':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'aquatic','Speed':5,'Swim':50,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Aquan','Senses':'Low-light vision','Defensive Traits':'Natural armor, legless','Offensive Traits':'','Skill Bonuses':'','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':'','Source':'Uncommon','BaseAge':15,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':70,'mHeightMod':'2d10','mWeight':145,'mWeightMod':'10d10','fHeight':68,'fHeightMod':'2d10','fWeight':135,'fWeightMod':'10d10','scripts':[]},
    'Nagaji':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'reptilian','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Draconic','Senses':'Low-light vision','Defensive Traits':'Armored scales, resistant','Offensive Traits':'','Skill Bonuses':'Handle Animal, Perception','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':'','Source':'Uncommon','BaseAge':20,'Intuitive':'1d6','SelfTaught':'2d6','Trained':'3d6','mHeight':69,'mHeightMod':'2d10','mWeight':180,'mWeightMod':'14d10','fHeight':66,'fHeightMod':'2d10','fWeight':160,'fWeightMod':'14d10','scripts':[]},
    'Samsaran':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'samsaran','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Samsaran','Senses':'Low-light vision','Defensive Traits':'Lifebound','Offensive Traits':'','Skill Bonuses':'Any two skills','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'comprehend languages, deathwatch, stabilize','Race Points':'','Source':'Uncommon','BaseAge':60,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'8d6','mHeight':64,'mHeightMod':'2d8','mWeight':110,'mWeightMod':'10d8','fHeight':66,'fHeightMod':'2d8','fWeight':110,'fWeightMod':'10d8','scripts':[]},
    'Strix':{'con':0,'wis':0,'cha':0,'dex':0,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'strix','Speed':30,'Swim':0,'Climb':0,'Fly':60,'Clumsy':0,'Starting Languages':'Strix','Senses':'Darkvision, low-light vision','Defensive Traits':'Suspicious','Offensive Traits':'Hatred','Skill Bonuses':'Perception, Stealth','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':'','Source':'Uncommon','BaseAge':12,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':64,'mHeightMod':'2d8','mWeight':125,'mWeightMod':'10d8','fHeight':62,'fHeightMod':'2d8','fWeight':115,'fWeightMod':'10d8','scripts':[]},
    'Suli':{'con':0,'wis':0,'cha':2,'dex':0,'str':2,'int':-2,'any':0,'Size':'Medium','Type':'Outsider','Subtype':'native','Speed':30,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Common, 1 elemental (Aquan, Auran, Ignan, or Terran)','Senses':'Low-light vision','Defensive Traits':'Energy resistance 5 (acid, cold, electricity, and fire)','Offensive Traits':'','Skill Bonuses':'Diplomacy, Sense Motive','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'Elemental assault','Race Points':16,'Source':'Uncommon','BaseAge':15,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':58,'mHeightMod':'2d10','mWeight':120,'mWeightMod':'10d10','fHeight':53,'fHeightMod':'2d10','fWeight':85,'fWeightMod':'10d10','scripts':[]},
    'Svirfneblin':{'con':0,'wis':2,'cha':-2,'dex':2,'str':-2,'int':0,'any':0,'Size':'Small','Type':'Humanoid','Subtype':'gnome','Speed':20,'Swim':0,'Climb':0,'Fly':0,'Clumsy':0,'Starting Languages':'Gnome, Undercommon','Senses':'Darkvision 120 ft., low-light vision','Defensive Traits':'+2 AC, +2 to all saving throws, spell resistance','Offensive Traits':'+1 attack vs. humanoids (reptilians) and humanoids (dwarvens)','Skill Bonuses':'Stealth, Craft (alchemy), Perception; stonecunning','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'Constant—nondetection; 1/day—blindness/deafness, blur, disguise self','Race Points':24,'Source':'Uncommon','BaseAge':40,'Intuitive':'4d6','SelfTaught':'6d6','Trained':'9d6','mHeight':36,'mHeightMod':'2d4','mWeight':35,'mWeightMod':'2d4','fHeight':34,'fHeightMod':'2d4','fWeight':30,'fWeightMod':'2d4','scripts':[]},
    'Vanara':{'con':0,'wis':2,'cha':-2,'dex':2,'str':0,'int':0,'any':0,'Size':'Medium','Type':'Humanoid','Subtype':'vanara','Speed':30,'Swim':0,'Climb':20,'Fly':0,'Clumsy':0,'Starting Languages':'Common, Vanaran','Senses':'Low-light vision','Defensive Traits':'Prehensile tail','Offensive Traits':'','Skill Bonuses':'Acrobatics, Stealth','Bonus Feats':'','Spell-Like (Sp) or Supernatural (Su) Abilities':'','Race Points':8,'Source':'Uncommon','BaseAge':14,'Intuitive':'1d4','SelfTaught':'1d6','Trained':'2d6','mHeight':56,'mHeightMod':'2d8','mWeight':105,'mWeightMod':'10d8','fHeight':50,'fHeightMod':'2d8','fWeight':90,'fWeightMod':'10d8','scripts':[]},
}
var sizeData = {
    'Fine':{'Mod':8,'Fly':8,'Stealth':16,'Space':0.5,'Reach':0,'Dimensions':0.5,'Weight':0,'carry':0.125,'quad':0.25},
    'Diminutive':{'Mod':4,'Fly':6,'Stealth':12,'Space':1,'Reach':0,'Dimensions':1,'Weight':0.125,'carry':0.25,'quad':0.5},
    'Tiny':{'Mod':2,'Fly':4,'Stealth':8,'Space':2.5,'Reach':0,'Dimensions':2,'Weight':1,'carry':0.5,'quad':0.75},
    'Small':{'Mod':1,'Fly':2,'Stealth':4,'Space':5,'Reach':5,'Dimensions':4,'Weight':8,'carry':0.75,'quad':1},
    'Medium':{'Mod':0,'Fly':0,'Stealth':0,'Space':5,'Reach':5,'Dimensions':8,'Weight':60,'carry':1,'quad':1.5},
    'Large':{'Mod':-1,'Fly':-2,'Stealth':-4,'Space':10,'Reach':10,'Dimensions':16,'Weight':500,'carry':2,'quad':3},
    'LargeLong':{'Mod':-1,'Fly':-2,'Stealth':-4,'Space':10,'Reach':5,'Dimensions':16,'Weight':500,'carry':2,'quad':3},
    'Huge':{'Mod':-2,'Fly':-4,'Stealth':-8,'Space':15,'Reach':15,'Dimensions':32,'Weight':2000,'carry':4,'quad':6},
    'HugeLong':{'Mod':-2,'Fly':-4,'Stealth':-8,'Space':15,'Reach':10,'Dimensions':32,'Weight':2000,'carry':4,'quad':6},
    'Gargantuan':{'Mod':-4,'Fly':-6,'Stealth':-12,'Space':20,'Reach':20,'Dimensions':64,'Weight':32000,'carry':8,'quad':12},
    'GargantuanLong':{'Mod':-4,'Fly':-6,'Stealth':-12,'Space':20,'Reach':15,'Dimensions':64,'Weight':32000,'carry':8,'quad':12},
    'Colossal':{'Mod':-8,'Fly':-8,'Stealth':-16,'Space':30,'Reach':30,'Dimensions':128,'Weight':250000,'carry':16,'quad':24},
    'ColossalLong':{'Mod':-8,'Fly':-8,'Stealth':-16,'Space':30,'Reach':20,'Dimensions':128,'Weight':250000,'carry':16,'quad':24}
}
var abilities = {
    'str':{'name':'Strength'},
    'dex':{'name':'Dexterity'},
    'con':{'name':'Constitution'},
    'int':{'name':'Intelligence'},
    'wis':{'name':'Wisdom'},
    'cha':{'name':'Charisma'}
}
var abilityCost = {
    7:-4,
    8:-2,
    9:-1,
    10:0,
    11:1,
    12:2,
    13:3,
    14:5,
    15:7,
    16:10,
    17:13,
    18:17
}
var skillData = {
    'Acrobatics':{'untrained':1,'armorCheckPenalty':1,'ability':'dex',},
    'Appraise':{'untrained':1,'armorCheckPenalty':0,'ability':'int',},
    'Bluff':{'untrained':1,'armorCheckPenalty':0,'ability':'cha',},
    'Climb':{'untrained':1,'armorCheckPenalty':1,'ability':'str',},
    'Craft':{'untrained':1,'armorCheckPenalty':0,'ability':'int',},
    'Diplomacy':{'untrained':1,'armorCheckPenalty':0,'ability':'cha',},
    'Disable Device':{'untrained':0,'armorCheckPenalty':1,'ability':'dex',},
    'Disguise':{'untrained':1,'armorCheckPenalty':0,'ability':'cha',},
    'Escape Artist':{'untrained':1,'armorCheckPenalty':1,'ability':'dex',},
    'Fly':{'untrained':1,'armorCheckPenalty':1,'ability':'dex',},
    'Handle Animal':{'untrained':0,'armorCheckPenalty':0,'ability':'cha',},
    'Heal':{'untrained':1,'armorCheckPenalty':0,'ability':'wis',},
    'Intimidate':{'untrained':1,'armorCheckPenalty':0,'ability':'cha',},
    'K. Arcana':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Dungeon':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Engineering':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Geography':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. History':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Local':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Nature':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Nobility':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Planes':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'K. Religion':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'Linguistics':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'Perception':{'untrained':1,'armorCheckPenalty':0,'ability':'wis',},
    'Perform':{'untrained':1,'armorCheckPenalty':0,'ability':'cha',},
    'Profession':{'untrained':0,'armorCheckPenalty':0,'ability':'wis',},
    'Ride':{'untrained':1,'armorCheckPenalty':1,'ability':'dex',},
    'Sense Motive':{'untrained':1,'armorCheckPenalty':0,'ability':'wis',},
    'Sleight of Hand':{'untrained':0,'armorCheckPenalty':1,'ability':'dex',},
    'Spellcraft':{'untrained':0,'armorCheckPenalty':0,'ability':'int',},
    'Stealth':{'untrained':1,'armorCheckPenalty':1,'ability':'dex',},
    'Survival':{'untrained':1,'armorCheckPenalty':0,'ability':'wis',},
    'Swim':{'untrained':1,'armorCheckPenalty':1,'ability':'str',},
    'Use Magic Device':{'untrained':0,'armorCheckPenalty':0,'ability':'cha',},
}
var loadData = [
    {'light':0,'medium':0,'heavy':0},
    {'light':3,'medium':6,'heavy':10},
    {'light':6,'medium':13,'heavy':20},
    {'light':10,'medium':20,'heavy':30},
    {'light':13,'medium':26,'heavy':40},
    {'light':16,'medium':33,'heavy':50},
    {'light':20,'medium':40,'heavy':60},
    {'light':23,'medium':46,'heavy':70},
    {'light':26,'medium':53,'heavy':80},
    {'light':30,'medium':60,'heavy':90},
    {'light':33,'medium':66,'heavy':100},
    {'light':38,'medium':76,'heavy':115},
    {'light':43,'medium':86,'heavy':130},
    {'light':50,'medium':100,'heavy':150},
    {'light':58,'medium':116,'heavy':175},
    {'light':66,'medium':133,'heavy':200},
    {'light':76,'medium':153,'heavy':230},
    {'light':86,'medium':173,'heavy':260},
    {'light':100,'medium':200,'heavy':300},
    {'light':116,'medium':233,'heavy':350},
    {'light':133,'medium':266,'heavy':400},
    {'light':153,'medium':306,'heavy':460},
    {'light':173,'medium':346,'heavy':520},
    {'light':200,'medium':400,'heavy':600},
    {'light':233,'medium':466,'heavy':700},
    {'light':266,'medium':533,'heavy':800},
    {'light':306,'medium':613,'heavy':920},
    {'light':346,'medium':693,'heavy':1040},
    {'light':400,'medium':800,'heavy':1200},
    {'light':466,'medium':933,'heavy':1400},
    {'light':532,'medium':1064,'heavy':1600},
    {'light':612,'medium':1224,'heavy':1840},
    {'light':692,'medium':1384,'heavy':2080},
    {'light':800,'medium':1600,'heavy':2400},
    {'light':932,'medium':1864,'heavy':2800},
    {'light':1064,'medium':2132,'heavy':3200},
    {'light':1224,'medium':2452,'heavy':3680},
    {'light':1384,'medium':2772,'heavy':4160},
    {'light':1600,'medium':3200,'heavy':4800},
    {'light':1864,'medium':3732,'heavy':5600},
    {'light':2128,'medium':4256,'heavy':6400},
    {'light':2448,'medium':4896,'heavy':7360},
    {'light':2768,'medium':5536,'heavy':8320},
    {'light':3200,'medium':6400,'heavy':9600},
    {'light':3728,'medium':7456,'heavy':11200},
    {'light':4256,'medium':8528,'heavy':12800}
]
var encumbranceData = {
    'Light':{'maxDex':80,'checkPenalty':0,'speed':function(){return c.speed},'run':4,'name':'Light'},
    'Medium':{'maxDex':3,'checkPenalty':-3,'speed':function(){return reduceSpeed(c.speed)},'run':4,'name':'Medium'},
    'Heavy':{'maxDex':1,'checkPenalty':-6,'speed':function(){return reduceSpeed(c.speed)},'run':3,'name':'Heavy'},
    'Staggered':{'maxDex':0,'checkPenalty':-9,'speed':function(){return 5},'run':1,'name':'Staggered'}, // I made up the check penalties for these last two
    'Immobile':{'maxDex':0,'checkPenalty':-12,'speed':function(){return 0},'run':1,'name':'Immobile'}
}
function reduceSpeed(org){return Math.round(org/7.5)*5};
var levelData = [
    {'feats':0,'abilityScore':0},
    {'feats':1,'abilityScore':0},
    {'feats':1,'abilityScore':1},
    {'feats':2,'abilityScore':1},
    {'feats':2,'abilityScore':2},
    {'feats':3,'abilityScore':2},
    {'feats':3,'abilityScore':3},
    {'feats':4,'abilityScore':3},
    {'feats':4,'abilityScore':4},
    {'feats':5,'abilityScore':4},
    {'feats':5,'abilityScore':5},
    {'feats':6,'abilityScore':5},
    {'feats':6,'abilityScore':6},
    {'feats':7,'abilityScore':6},
    {'feats':7,'abilityScore':7},
    {'feats':8,'abilityScore':7},
    {'feats':8,'abilityScore':8},
    {'feats':9,'abilityScore':8},
    {'feats':9,'abilityScore':9},
    {'feats':10,'abilityScore':9},
    {'feats':10,'abilityScore':10}
]