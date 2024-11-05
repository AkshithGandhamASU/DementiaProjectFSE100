//Akshith Gandham
//Alex Myers
//Eric Chen
//Leo Bryant
//Gavin Roth

//pigstep, 85.00 : 1.4167 bps
//blocks, 110.01 : 1.8335 bps

class Song {
    #beat;
    #bpm;
    #audio;
    #health;
    #combo;
    #last_beat_index;

    constructor(sound, beat, bpm) {
        this.audio = sound;
        this.health = 10;
        this.beat = beat;
        this.bpm = bpm;
        this.last_beat_index = 0;
    }

    get_audio() {
        return this.audio;
    }

    distance_from_beat(time) {
        let beat_index = Math.round(time/this.bpm) - 1;
        let i = this.last_beat_index;
        let distances = [];
        while(distances.length < 2) {
            // console.log("while loop");
            if(this.beat[i] == 1) {
                distances.push(Math.abs(beat_index - i));
                this.last_beat_index = i;
                console.log("if1");
                if( i < beat_index) {
                    console.log("if2");
                    i = beat_index;
                }
                continue;
            }
            i++;
        }

        return Math.min(distances[0], distances[1]);
    }
}


class DDR {
    #song;
    #bpm;
    #time_start;

    #speed;

    directions;

    constructor(song_f, bpm) {
        this.song = new Song(song_f, beat1, bpm);
        this.bpm = bpm;
        this.time_start = millis();

        this.speed = 500 / (bpm/60);

        this.directions = ['l', 'r', 'u', 'd', 'n'];
    }

    next_song(song_f, bpm) {
        this.song = new Song(song_f, beat1, bpm);
        this.bpm = bpm;
        this.time_start = millis();

        this.speed = 500 / (bpm/60);
    }

    move_arrows() {

    }

    #spawn_arrow(direction) {
        
    }

    update() {
        if((millis() - this.time_start) % (bpm/60/100) == 0) {
            this.#spawn_arrow(directions(random(0, 4)));
        }
    }

    display() {

    }
}