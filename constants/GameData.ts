export interface LevelData {
    id: number;
    monsterName: String;
    monsterImg: any;
    prompt: String;
    correctAnswer: String;
    suffix: String;
    damage: number;
}

export const LEVELS: LevelData[] = [
    {
        id: 1,
        monsterName: "Syntax Slime",
        monsterImg: {uri: "https://static.vecteezy.com/system/resources/thumbnails/027/517/826/small_2x/pixel-art-slime-monster-character-3-png.png"},
        prompt: "// Task loop 5 times",
        correctAnswer: "for", 
        suffix: " (i = 0; i < 5; i++)",
        damage: 35
    },
    {
    id: 2,
    monsterName: "Logic Locust",
    monsterImg: { uri: 'https://cdn-icons-png.flaticon.com/512/606/606801.png' },
    prompt: "// Task: Check if hp is less than 0",
    correctAnswer: "if",
    suffix: " (hp < 0) { die() }",
    damage: 100
  },
  {
    id: 3,
    monsterName: "Looping Legend",
    monsterImg: { uri: 'https://cdn-icons-png.flaticon.com/512/1680/1680373.png' }, 
    prompt: "// Task: Loop 5 times",
    correctAnswer: "for",
    suffix: " (i=0; i<5; i++)",
    damage: 35
  }
];