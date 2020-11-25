
class VerbDTO {

    constructor(id, plain, polite, furigana, vietnamese, english, group, form1, form2, form3, result) {
        this.id = id;
        this.plain = plain;
        this.polite = polite;
        this.furigana = furigana;
        this.vietnamese = vietnamese;
        this.english = english;
        this.group = group;
        this.form1 = form1;
        this.form2 = form2;
        this.form3 = form3;
        this.result = result;
    }
}

module.exports = VerbDTO;
