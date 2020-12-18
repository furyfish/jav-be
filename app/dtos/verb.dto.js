
class VerbDTO {

    constructor(id, kanji, furigana, name_vn, name_en, group, jisho, form, tense, type, result1, result2) {
        this.id = id;
        this.kanji = kanji;
        this.furigana = furigana;
        this.name_vn = name_vn;
        this.name_en = name_en;
        this.group = group;
        this.jisho = jisho;
        this.form = form;
        this.tense = tense;
        this.type = type;
        this.result1 = result1;
        this.result2 = result2;
    }
}

module.exports = VerbDTO;
