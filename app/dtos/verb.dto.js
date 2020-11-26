
class VerbDTO {

    constructor(id, kanji, furigana, vietnamese, english, group, jisho, form1, form2, form3, result1, result2) {
        this.id = id;
        this.kanji = kanji;
        this.furigana = furigana;
        this.vietnamese = vietnamese;
        this.english = english;
        this.group = group;
        this.jisho = jisho;
        this.form1 = form1;
        this.form2 = form2;
        this.form3 = form3;
        this.result1 = result1;
        this.result2 = result2;
    }
}

module.exports = VerbDTO;
