const moment = require('moment');


var helpers = function (Handlebars) {
    return {
        isSelected: function (selected, pickedItem) {
            var isSelected = '';
            if (selected == pickedItem) {
                isSelected = ' selected ';
            } else {
                isSelected = '';
            }
            return (isSelected);
        },
        isChecked: function (checked) {
            return (checked == 'true' || checked == 1) ? 'checked' : '';
        }, 
        if_eq: function (a, b, opts) {

            if (a === b)          
                return opts.fn(this);
            else
                return  opts.inverse(this);
        },
        if_not: function (a, b, opts) {
            if (a != b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        if_length_zero: function (a, b, opts) {
            if (a.length === b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        if_length_greater_zero: function (a, b, opts) {
            if (a.length > b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        parse_date: function (date) {
            // return 'test ' + date;
            return moment(date).format("DD/MM/YYYY");
        },
        parse_dateSS: function (date) {
            if (!date)
                return '-';
            // return 'test ' + date;
            return moment(date).format("DD/MM/YYYY HH:SS");
        },
        parse_dateSSA: function (date) {
            if (!date)
                return '-';
            // return 'test ' + date;
            return moment(date).format("DD/MM/YYYY HH:SS A");
        },
        isYesNo: function (checked) {

            return (checked && checked == 1) ? 'Si' : 'No';
        },
        hasPropYN: function (checked) {

            return (checked) ? 'Si' : 'No';

        },
        getPercent: function (pPos, pEarned) {

            var perc = "";
            if (isNaN(pPos) || isNaN(pEarned)) {
                perc = " ";
            } else {
                perc = ((pEarned / pPos) * 100).toFixed(3);
            }

            return perc + '%';
        },
        parseStatus: function (status) {
            let lang = 'es';
            let str = '';
            switch (status) {
                case 'pending':
                    //TODO get language by langmanager
                    str = 'Pendiente'
                    break;
                case 'processing':
                    //TODO get language by langmanager
                    str = 'Procesando'
                    break;
                case 'inprogress':
                    //TODO get language by langmanager
                    str = 'En Camino'
                    break;
                case 'delivered': 
                    //TODO get language by langmanager
                    str = 'Entregado'
                    break;                
            }
            return str;
        },
        parseStatusKycFisico: function (status) {
            let lang = 'es';
            let str = '';
            switch (status) {
                case 'pending':
                case 'opened':
                    //TODO get language by langmanager
                    str = 'Pendiente'
                    break;
                case 'approved':
                    //TODO get language by langmanager
                    str = 'Aprobado'
                    break;
                case 'signed':
                    //TODO get language by langmanager
                    str = 'Esperando Revisión'
                    break;
                case 'inProgress':
                    //TODO get language by langmanager
                    str = 'Esperando por el cliente'
                    break;
                case 'all':
                    //TODO get language by langmanager
                    str = 'Todos'
                    break;
                case 'done':
                    str = 'Aprobado'
                    break;
                case 'reject':
                    str = 'Rechazado'
                    break;
                case 'rejected':
                    str = 'Rechazado'
                    break;
            }
            return str;
        },
        parseStatusColor: function (status) {

            let str = '';
            switch (status) {
                case 'pending':
                    //TODO get language by langmanager
                    str = 'bg-warning'
                    break;
                case 'approved':
                    //TODO get language by langmanager
                    str = 'bg-info small-font'
                    break;
                case 'signed':
                    //TODO get language by langmanager
                    str = 'bg-warning small-font'
                    break;
                case 'inProgress':
                    //TODO get language by langmanager
                    str = 'bg-warning small-font'
                    break;
                case 'all':
                    //TODO get language by langmanager
                    str = 'Todos'
                    break;
                case 'done':
                    str = 'bg-success'
                    break;

                case 'reject':
                    str ='bg-success'
                    break;

                case 'rejected':
                    str = 'bg-success'
                    break;
            }
            return str;
        },
        parseStatusBadgeColor: function (status) {

            let str = '';
            switch (status) {
                case 'pending':
                    //TODO get language by langmanager
                    str = 'badge-warning'
                    break;
                case 'approved':
                    //TODO get language by langmanager
                    str = 'badge-info'
                    break;
                case 'signed':
                    //TODO get language by langmanager
                    str = 'badge-warning'
                    break;
                case 'inProgress':
                    //TODO get language by langmanager
                    str = 'bg-info small-font'
                    break;
                case 'all':
                    //TODO get language by langmanager
                    str = 'Todos'
                    break;
                case 'done':
                    str = 'badge-success'
                    break;
                case 'reject':
                    str = 'badge-danger'
                    break;

                case 'rejected':
                    str = 'badge-danger'
                    break;
            }

            return str;
        },
        parseOwner: function (owner) {
            let lang = 'es';
            let str = '';
            if (!owner) {
                str = '<span class="badge badge-pill badge-danger">Sin Asignar</span>';
            } else {
                str = owner;
            }
            return str;
        },
        
        drawInput: function (label, initialValue, type, isSelected, desktopSize, helper , isSucursal=false) {

            let lang = 'es';
            let str = '';
           
            let _helper = '';
            let checked = '';
            if (helper && helper != 'undefined') {
                _helper = helper;
            }
            switch (type) {
                
                case 'text':
                case 'TEXT': 
                case 'SELECTLIST':
                    if( initialValue.length > 0) {
                    str = `<div class="form-group col-md-${desktopSize}">
                        <label for="exampleInputEmail1">${label}</label>                                            
                        <input type="text" class="form-control" id="${label}" placeholder="${label}" value="${initialValue}" readonly>
                        <small id="emailHelp" class="form-text text-muted">${_helper}</small> 
                    </div>`; 
                    }
                    break;
                case 'date':
                    let date;
                    if(initialValue === "") {
                        date = 'N/A'
                    } else {
                        date = initialValue
                    }
                    str = `<div class="form-group col-md-${desktopSize}">
                                <label for="exampleInputEmail1">${label}</label>                                            
                                <input type="text" class="form-control" id="dateForm" placeholder="${label}" value="${date}" readonly>
                                <small id="emailHelp" class="form-text text-muted">${_helper}</small> 
                            </div>`;

                    break;
                case 'SWITCH':
                    checked = (isSelected) ? 'checked' : '';

                    str = `<div class="form-group col-md-${desktopSize}">
                                <label for="exampleInputEmail1">${label}</label>                                            
                                <input type="checkbox" ${checked} class="js-switch" data-color="#009efb" disabled>
                                <small id="emailHelp" class="form-text text-muted">${_helper}</small> 
                            </div>`;
                    break;
                case 'TXTAREA':

                    str = `<div class="form-group col-md-${desktopSize}">
                                <label for="exampleInputEmail1">${label}</label>                                            
                                <textarea class="form-control" rows="3" readonly>${initialValue}</textarea>
                                <small id="emailHelp" class="form-text text-muted">${_helper}</small> 
                            </div>`;
                    break;

                case 'CHECKBOX':
                    checked = (isSelected) ? 'checked' : '';

                    str = `<div class="form-group col-md-${desktopSize}">
                                <label class="checkbox-inline">
                                    <input type="checkbox" id="" ${checked} value="" disabled="disabled"> ${label}
                                </label>
                            </div>`;
                    break;

                case 'UPLOAD':
                    checked = (isSelected) ? 'checked' : '';

                    // str = `<div class="form-group col-md-${desktopSize}">
                    //             <div class="img-frame">
                    //                 <img src="/img/id-placeholder.png" />
                    //             </div>
                    //         </div>`;
                    break;
            }


            return str;
        },
        parseFileExt: function (apiEndpoint, name, downlaod = "0") {

            let str = '';
            let fileExtension = name.substr((name.lastIndexOf('.') + 1));
            if (fileExtension === "pdf" && downlaod === "0") {
                str = "https://image.flaticon.com/icons/png/512/46/46532.png";
            } else if (fileExtension === "pdf" && downlaod === "1") {
                str = apiEndpoint + "/tmp/kyb/" + name;
            }
            else if (fileExtension === "crt") {
                str = "https://www.freeiconspng.com/uploads/certificate-icon-28.png";
            } else if (name.search("https://") > -1) {
                str = name;
            } else {
                str = apiEndpoint + "/tmp/kyb/" + name;
            }
            return str;
        },

        parseLogo: function(type , filename, sdkUrl ){
            let str = ''  
   
            switch(type){
                case 'image/jpeg':
                    
                case 'image/JPEG':
                case 'image/jpg':
                case 'image/JPG':   
                str = `<a href="" data-caption="imagen"><img src="${sdkUrl}/tmp/${filename}" width="100px"></a>`;
                break;
                case 'image/png':
                str = `<a href="" data-caption="imagen"><img src="${sdkUrl}/tmp/${filename}" width="100px"></a>`;
                break;
                case 'image/gif':
                str = `<a href="" data-caption="imagen"><img src="${sdkUrl}/tmp/${filename}" width="100px"></a>`;
                break;
                case 'application/msword':
                str = `<i class="fas fa-file-word fa-2x fa-align-center" style="color: #03A9F3;"></i>`;
                break;
                case 'application/pdf':
                str = `<i class="fas fa-file-pdf fa-2x fa-align-center" style="color: #03A9F3;"></i>`;
                break;

                
            }
            return str;
            
        }, 

        dateToSpanish: date => {
            return moment(date).locale('es').format('LLLL')
        }
        
         

    }
    
    




}



module.exports = helpers;
