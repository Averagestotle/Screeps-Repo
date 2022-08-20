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
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    
        if(harvesters.length < harvesterMaxLimit) {
            var newName = 'Harvester' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'harvester', sourceAssigned: 0}});
        }
        
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
        if(builders.length < builderMaxLimit) {
            var newName = 'Builder' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'builder'}});
        }
        
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
        if(upgraders.length < upgraderMaxLimit) {
            var newName = 'Upgrader' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'upgrader'}});
        }
        
    var utilities = _.filter(Game.creeps, (creep) => creep.memory.role == 'utilities');
    
        if(utilities.length < utilitiesMaxLimit) {
            var newName = 'Utility' + Game.time;
            //console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'utilities'}});
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
}