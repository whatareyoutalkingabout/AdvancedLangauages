//Grant access to file system
var fs = require('fs');

//Create xls file
var writeStream = fs.createWriteStream("Animal_Farm.xls");

//Create a string to load into writeStream file
var header="Why then do we continue in this miserable condition? Because nearly the whole of the produce of our labour is stolen from us by human beings. There, comrades, is the answer to all our problems. It is summed up in a single word--Man. Man is the only real enemy we have. Remove Man from the scene, and the root cause of hunger and overwork is abolished for ever."
			+"\t"+" Somehow it seemed as though the farm had grown richer without making the animals themselves any richer — except, of course, for the pigs and the dogs."
			+"\n";

//Write header string to file
writeStream.write(header);

//Close file
writeStream.close();

