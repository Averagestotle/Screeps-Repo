var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleUtilities = require('role.utilities');
//var SpawnCheck = require('spawn.creepSpawnCheck');

var harvesterMaxLimit = 2;
var builderMaxLimit = 2;
var upgraderMaxLimit = 1;
var utilitiesMaxLimit = 1;

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var sourceNumber = 0;
    var resourceCapcity = Game.rooms['sim'].energyCapacityAvailable;
    var assignedSourceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.sourceAssigned == 0);

    if (assignedSourceHarvesters < 2) {
        sourceNumber = 0;
        
    }
    else {
        sourceNumber = 1;
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        if(harvesters.length < 4) {
            var newName = 'Harvester' + Game.time;
            var roleName = 'harvester';

            if (resourceCapcity <= 350) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 400) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 500) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }            
            //console.log('Spawning new harvester: ' + newName);            
        }
    
    if (harvesters.length > 1) {    
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
        if(builders.length < 2) {
            var newName = 'Builder' + Game.time;
            var roleName = 'builder';
            //console.log('Spawning new harvester: ' + newName);

            if (resourceCapcity <= 350) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 400) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 500) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            //Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            //    {memory: {role: roleName}});
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
        if(upgraders.length < 1) {
            var newName = 'Upgrader' + Game.time;
            //console.log('Spawning new harvester: ' + newName);

            if (resourceCapcity <= 350) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 400) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 500) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }
        }
        
        var utilities = _.filter(Game.creeps, (creep) => creep.memory.role == 'utilities');
    
        if(utilities.length < 1) {
            var newName = 'Utility' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            
            if (resourceCapcity <= 350) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 400) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }

            if (resourceCapcity >= 500) { 
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: roleName, sourceAssigned: sourceNumber}}); 
            }
        }    
    }   

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'utilities') {
            roleUtilities.run(creep);
        }
    }
    console.log('Room has '+Game.rooms['sim'].energyAvailable +' energy available');
    console.log('Room has '+Game.rooms['sim'].energyCapacityAvailable+' energy allowable');
}