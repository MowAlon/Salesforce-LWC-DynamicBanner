import { LightningElement, api } from 'lwc';
import getRecords from '@salesforce/apex/LWC_Utilities.records';

export default class DynamicBanner extends LightningElement {
    @api objectApiName;
    @api recordId;

    @api collapsable = false; // Setting these values here only impacts the Lightning Page Builder - NOT setting them would make it appear as collapsable and collapsed when the builder loads, even if those aren't the selected options.
    @api collapse    = false;
    @api direction;
    get doCollapse() {return this.collapsable && this.collapse;}

    @api title1;
    @api text1;
    @api background1;
    @api bold1   = false;
    @api border1 = false;
    @api borderColor1;
    @api borderWidth1;
    @api fontColor1;
    @api fontSize1;
    @api alignment1;

    @api title2;
    @api text2;
    @api background2;
    @api bold2   = false;
    @api border2 = false;
    @api borderColor2;
    @api borderWidth2;
    @api fontColor2;
    @api fontSize2;
    @api alignment2;

    markUp = '~~';
    markUpRegEx = this.markUp + '.+' + this.markUp;

    isLoading = true;
    mainStyle;
    style1;
    style2;

    connectedCallback() {
        this.setStyles();
        this.translateText();
    }

    setStyles() {
        this.mainStyle = 'flex-direction:' + this.direction;
        this.style1    = this.style(this.text1, this.background1, this.bold1, this.border1, this.borderColor1, this.borderWidth1, this.fontColor1, this.fontSize1, this.alignment1);
        this.style2    = this.style(this.text2, this.background2, this.bold2, this.border2, this.borderColor2, this.borderWidth2, this.fontColor2, this.fontSize2, this.alignment2);
        if (this.style2 == 'display:none') { this.style1 = this.style1.replace('flex-basis:50%', 'flex-basis:100%'); }
    }
        style(text, background, bold, border, borderColor, borderWidth, fontColor, fontSize, alignment) {
            if (text) {
                let styles = ['flex-basis:50%'];

                if (background)  { styles.push('background-color:' + background); }
                if (bold)        { styles.push('font-weight:bold'); }
                if (border)      { styles.push(`border:${borderWidth} solid ${borderColor}`) };
                if (fontColor)   { styles.push('color:' + fontColor); }
                if (fontSize)    { styles.push('font-size:' + fontSize); }
                if (alignment)   { styles.push('text-align:' + alignment); styles.push('justify-content:' + alignment);}

                return styles.join(';');
            } else {return 'display:none';}
        }

    translateText() {
        let titleFields1 = this.fields(this.title1);
        let textFields1  = this.fields(this.text1);
        let titleFields2 = this.fields(this.title2);
        let textFields2  = this.fields(this.text2);
        let allFields = new Set([...titleFields1, ...textFields1, ...titleFields2, ...textFields2]);

        if (allFields.size) {
            let query = `SELECT ${[...allFields].join()} FROM ${this.objectApiName} WHERE Id = '${this.recordId}'`;

            getRecords({ query: query })
                .then(records => {
                    let record = records[0];

                    this.title1 = this.textWithFieldsReplaced(this.title1, record, titleFields1);
                    this.text1  = this.textWithFieldsReplaced(this.text1,  record, textFields1);
                    this.title2 = this.textWithFieldsReplaced(this.title1, record, titleFields2);
                    this.text2  = this.textWithFieldsReplaced(this.text2,  record, textFields2);
                })
                .finally(() => {this.isLoading = false;});
        } else {this.isLoading = false;}
    }
        fields(text) {
            let fields = new Set();

            while (text && text.search(this.markUpRegEx) != -1) {
                let markedField = this.markedField(text);
                let field = markedField.replaceAll(this.markUp, '');

                fields.add(field);
                text = text.replace(markedField, '');
            }

            return fields;
        }
            markedField(searchText) {
                let openMark = searchText.search(this.markUpRegEx);
                if (openMark != -1) {
                    let closeMark = searchText.indexOf(this.markUp, openMark + 1) + 2;
                    return searchText.substring(openMark, closeMark);
                } else { return false; }
            }
        textWithFieldsReplaced(text, record, fields) {
            fields.forEach(field => {
                let markedField = this.markUp + field + this.markUp;
                let fieldValue = this.fieldValue(record, field);
                text = text.replaceAll(markedField, fieldValue);
            });

            return text;
        }

    fieldValue(record, field) {
        // Recursive solution for accessing fields across unlimited parent relationships

        if (record) {
            if (field.indexOf('.') == -1) {return record[field] != null && record[field] != undefined ? record[field] : '';}
            else {
                let parentRelationshipField = field.split('.')[0];
                let parentRecord = record[parentRelationshipField];
                let parentField = field.replace(parentRelationshipField + '.', '');
                return this.fieldValue(parentRecord, parentField);
            }
        } else {return '';}
    }

    toggleCollapse() {
        this.collapse = !this.collapse;
    }
}