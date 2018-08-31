import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/fileupload/fileuploaddemo.html'
})
export class FileUploadDemo {

    msgs: Message[];
    
    uploadedFiles: any[] = [];

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }


    filesToUpload: Array<File>;

    constructor() {
        this.filesToUpload = [];
    }

    upload() {
        this.readCSV(this.filesToUpload).then((result) => {
            console.log('result1:');
            console.log(result);
            console.log(typeof (result));
            //console.log('result2:');
            //console.log(JSON.parse(result));
            //console.log(typeof (JSON.parse(result)));
            console.log('result3:');
            console.log(JSON.stringify(result));
            console.log(typeof (JSON.stringify(result)));
            // var array = this.csvToArray(result);
            // var arrayFormatado = this.formatarResultado(array);
            // console.log('arrayFormatado:');
            // console.log(arrayFormatado);
            // console.log('array:');
            // console.log(array);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.upload();
    }

    readCSV(files: Array<File>) {
        return new Promise((resolve, reject) => {
            var fileReader = new FileReader();

            fileReader.onload = function (e) {
                resolve(fileReader.result);
                return;
            };

            fileReader.readAsText(files[0]);
        });
    }

    csvToArray(csv: any) {
        var array = csv.split("\n");
        var lines = this.removeEmptyRows(array);
        var result = [];

        var headers = lines[0].split(";");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(";");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        return result;
    }

    removeEmptyRows(array: any) {
        return array.filter(line => line !== "");
    }

    criarJsonPadrao(item: any) {
        return {
            grupo: {
                id: item.IDGrupo
            },
            produto: {
                id: item.IDProduto
            },
            embalagem: {
                id: 0
            },
            dataInicio: item.DataInicio,
            precos: {
                normal: item.PrecoNormal,
                proposto: item.PrecoProposto,
                limite: item.PrecoLimite
            },
            usuario: "USR_PRICING"
        };
    }

    formatarResultado(array: any) {
        var result = [];
        for (var item of array) {
            var itemFormatado = this.criarJsonPadrao(item);
            result.push(itemFormatado);
        }

        return result;
    }
}