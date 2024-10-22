//blocks, 110.01
//pigstep, 85.00

class Song {
    #beat;
    #bpm;
    #audio;
    #health;
    #combo;
    #speed;
    #last_beat_index;

    constructor(sound, difficulty, beat, bpm) {
        this.audio = sound;
        this.speed = (difficulty===0)? 1 : 2;
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
    #clear_arrow;
    #stone_arrow;
    #iron_arrow;
    #gold_arrow;
    #diamond_arrow;

    #hard_song;
    #easy_song;

    constructor(arrow_c, arrow_s, arrow_i, arrow_g, arrow_d, song1, song2) {
        this.clear_arrow = arrow_c;
        this.stone_arrow = arrow_s;
        this.iron_arrow = arrow_i;
        this.gold_arrow = arrow_g;
        this.diamond_arrow = arrow_d;

        this.hard_song = song1;
        this.easy_song = song2;
        
    }
}