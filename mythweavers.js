function mythWeavers(){
    myth = {
        "id":2141393,"name":"David","portrait":"","sheet_template_id":39,"game_id":null,"private":0,"created_at":"2020-03-06 16:39:40",
        "updated_at":"2020-03-06 17:21:56","deleted_at":null,"downloaded_at":"2020-03-06 17:21:56","sheetdata_revision_id":"",
        "sheet_data":{"id":1784165,"sheet_id":2141393}
    }
    var jsondata = {
        "Player":"William",
        "Campaign":"CWC",
        "Deity":"Io",
        "ACSize":"0", // I don't know what this is
        "ACDodge":"0", // also don't know what this is
        "ACNat":"0",
        "ACDeflect":"0",
        "ACMisc":"0",
        "MABMisc":"0",
        "MABTemp":"0",
        "RABMisc":"0",
        "RABTemp":"0",
        "CMBMisc":"0",
        "CMBTemp":"0",
        "ReflexMagic":"0",
        "ReflexTemp":"0",
        "FortMagic":"0",
        "FortTemp":"0",
        "WillMagic":"0",
        "WillTemp":"0",
        "_meta_sheet_data_version":"1",
        "ArmorWorn":"1",
    }
    var i;
    var skillCounter = 0;
    for (i in t.skills.rank){
        skillCounter++;
        var counterTxt = "";
        if (skillCounter < 10){counterTxt = "Skill0" + skillCounter}else{counterTxt = "Skill"+skillCounter.toString()};
        jsondata[counterTxt] = i;
        jsondata[counterTxt+"Ab"] = skillData[i].ability;
        jsondata[counterTxt+"CC"] = "";
        jsondata[counterTxt+"AbMod"] = t.skills.AbilityMod(i).toString();
        jsondata[counterTxt+"Rank"] = t.skills.rank[i].toString();
        jsondata[counterTxt+"MiscMod"] = "0";
        jsondata[counterTxt+"ACP"] = t.skills.checkPenalty(i).toString();
        jsondata[counterTxt+"Mod"] = t.skills.total(i).total.toString();
    }
    jsondata.__txt_Notes = JSON.stringify(t.other);
    jsondata.Name = t.name;
    jsondata.Alignment = t.alignment[0]+t.alignment[1];
    jsondata.Class = t.class;
    jsondata.Race = t.race;
    jsondata.Level = t.level.toString();
    jsondata.MaxRank = t.level.toString();
    jsondata.Size = t.size.name;
    jsondata.LightLoad = t.loadLimit('light').toString();
    jsondata.MediumLoad = t.loadLimit('medium').toString();
    jsondata.HeavyLoad = t.loadLimit('heavy').toString();
    jsondata.LiftOverHead = jsondata.HeavyLoad;
    jsondata.LiftOffGround = (t.loadLimit('heavy')*2).toString();
    jsondata.LiftPushDrag = (t.loadLimit('heavy')*5).toString();
    jsondata.ACArmor = t.ac.currentArmor().bonus.toString();
    jsondata.ACShield = t.ac.currentShield().bonus.toString();
    jsondata.ACDex = t.ac.dexBonus().toString();
    jsondata.ACTouch = t.ac.touch().total.toString();
    var acObj = t.ac.total();
    jsondata.AC = acObj.total.toString();
    if (acObj.dex > 0){jsondata.ACFlat = (acObj.total - acObj.dex).toString()}else{jsondata.ACFlat = acObj.total.toString()};
    jsondata.CMBBase = t.attack.bab().toString();
    var cmdObj = t.ac.cmd();
    jsondata.CMD = cmdObj.total.toString();
    if (cmdObj.dex > 0){jsondata.FCMD = (cmdObj.total - cmdObj.dex).toString()}else{jsondata.FCMD = acObj.total.toString()};
    // attacks - a little messy
    var attackObj = t.attack.total('mainHand');
    jsondata.MABSize = attackObj.size.toString();
    jsondata.MABBase = attackObj.bab.toString();
    if (typeof(attackObj.str)=='undefined'){jsondata.MABStr = "0"}else{jsondata.MABStr = attackObj.str.toString()};
    jsondata.MBAB = attackObj.total.toString();
    jsondata.RABSize = attackObj.size.toString();
    jsondata.RABBase = attackObj.bab.toString();
    if (typeof(attackObj.dex)=='undefined'){jsondata.RABDex = "0"}else{jsondata.RABDex = attackObj.dex.toString()};
    jsondata.RBAB = attackObj.total.toString();
    // done with attacks
    var cmbObj = t.attack.cmb();
    jsondata.CMBSize = cmbObj.size.toString();
    jsondata.CMBStr = cmbObj.str.toString();
    jsondata.CMB = cmbObj.total.toString();
    jsondata.Age = t.age;
    jsondata.Gender = t.sex;
    jsondata.Height = t.prettyHeight();
    jsondata.Weight = t.prettyWeight();
    for (i in abilities){
        jsondata[abilities[i].cap] = t.abilities.score(i).toString();
        jsondata[abilities[i].cap+"Mod"] = t.abilities.mod(i).toString();
    }
    var savelist = {'fort':{'full':'Fort'},'ref':{'full':'Reflex'},'will':{'full':'Will'}}
    for (i in savelist){
        var saveObj = t.saves.total(i);
        jsondata[savelist[i].full+"Ability"] = saveObj.ability.toString();
        jsondata[savelist[i].full+"Base"] = saveObj.base.toString();
        jsondata[savelist[i].full+"Misc"] = (saveObj.total - saveObj.base - saveObj.ability).toString();
        jsondata[savelist[i].full] = saveObj.total.toString();
    }
    jsondata.InitDex = t.abilities.mod('dex').toString();
    jsondata.Init = jsondata.InitDex;
    jsondata.CasterLevel = t.level.toString();
    jsondata.HP = t.hp.max().total.toString();
    jsondata.HPWounds = t.hp.current.toString();
    jsondata.HPSub = t.hp.nl.toString(); //maybe wrong
    jsondata.HPHD = classData[t.class].HitDie.toString();
    jsondata.Speed = t.totalSpeed().toString();
    var armorObj = t.ac.currentArmor();
    jsondata.Armor = armorObj.subCat;
    var weapon1 = t.attack.currentWeapon('mainHand');
    jsondata.Weapon1 = weapon1.name;
    jsondata.Weapon1Damage = weapon1[t.size.dmg()];
    jsondata.Weapon1AB = attackObj.total.toString();
    jsondata.Weapon1Crit = weapon1.mincrit + "/x" + weapon1.crit;
    jsondata.Weapon1Weight = weapon1.weight.toString();
    jsondata.totalweight = t.totalWeight().toString();
    jsondata.Weapon1Type = weapon1.subCat;
    jsondata.ArmorName = armorObj.name;
    jsondata.ArmorType = armorObj.subCat;
    jsondata.ArmorBonus = armorObj.bonus.toString();
    jsondata.ArmorCheck = armorObj.acPenalty.toString();
    jsondata.ArmorDex = armorObj.dexBonus.toString();
    jsondata.ArmorWeight = armorObj.weight.toString();
    jsondata.ArmorSpell = armorObj.ArcaneSpellFailure.toString();
    jsondata.ArmorSpeed = armorObj['speed'+t.speed].toString();
    var allScripts = t.scripts.feats;
    for (i of t.scripts.class()){allScripts.push(i)};
    for (i of t.scripts.race()){allScripts.push(i)};
    console.log(allScripts);
    var scriptCounter = 1;
    for (i of allScripts){
        jsondata["Feat"+scriptCounter] = i.toString();
        scriptCounter++;
    };
    jsondata.total_ranks = t.skills.totalRanks().total.toString();
    var itemCounter = 0;
    for (i in t.items.Inventory.Other){
        itemCounter++;
        var counterTxt = "";
        if (itemCounter < 10){counterTxt = "0" + itemCounter}else{counterTxt = itemCounter.toString()};
        var itemObj = t.items.Inventory.Other[i]
        jsondata["Gear"+counterTxt] = i;
        jsondata["Gear"+counterTxt+"W"] = itemObj.weight;
        jsondata["Gear"+counterTxt+"01Loc"] = "inv";
    }
    jsondata.__txt_Cash = t.prettyWealth();
    var langCounter = 1;
    for (i of t.lang){
        jsondata["Lang"+langCounter] = i;
        langCounter++;
    }
    // to-do: spells
    // save & submit
    myth.sheet_data.jsondata = jsondata;
    downloadC(myth);
    return myth;
}