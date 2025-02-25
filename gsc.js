let row = 100;
let col = 26;

let text_edit = document.querySelector('#text_edt');
let head_col_val = document.querySelector('.head-row');

for (let i=0; i<col; i++) {
    let col_fix = document.createElement('span');
    col_fix.textContent=`${String.fromCharCode(65+i)}`;
    col_fix.classList.add('head-row-items');
    head_col_val.appendChild(col_fix);
}

let serial_row_val = document.querySelector('.serial-no');

for (let j=1; j<=row; j++) {
    let row_fix = document.createElement('span');
    row_fix.textContent=`${j}`;
    row_fix.classList.add('serial-row-items');
    serial_row_val.appendChild(row_fix);
}

let main_body_val = document.querySelector('.main-body');
for (let c = 1; c <=col; c++) {
    let a_z = document.createElement('div');
        
    a_z.classList.add('columns');

    for (let r = 1; r <=row; r++) {
        let _1_100 = document.createElement('span');
        _1_100.id=`${String.fromCharCode(64+c)}${r}`;
        _1_100.contentEditable='true';

        _1_100.classList.add('rows');
        a_z.appendChild(_1_100);
    }
    main_body_val.append(a_z);    
}
let selected_cell = "";
//click
main_body_val.addEventListener('click',function (event) {
    // 
    let show_val = document.querySelector('#selected_cell');
    show_val.textContent=`${event.target.id}`;  
    selected_cell = event.target;
    // console.log('ok this '+selected_cell);
    cell_value_to_lable();
});


//edit text
const mathRegex = /^[0-9+\-*/().\s]+$/;
main_body_val.addEventListener('keydown', function (event1) {
    
    if (event1.key === 'Enter') {
        event1.preventDefault(); // Prevent default behavior, if needed.
        let inputText = event1.target.textContent.trim();

        if (mathRegex.test(inputText)) {
            try {
                let result = eval(inputText);
                text_edit.textContent = result;
                event1.target.textContent = result;
            } catch (error) {
                console.error('Error evaluating expression:', error);
            }
        } else {
            text_edit.textContent = inputText;

            event1.target.textContent = inputText;
        }
    }


    text_edit.addEventListener('keydown', function (event) {
    
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior, if needed.
            let inputText_edt = event.target.textContent.trim();
    
            if (mathRegex.test(inputText_edt)){
                try {
                    let result1 = eval(inputText_edt);
                    event.textContent = result1;
                    event1.target.textContent = result1;
                } catch (error) {
                    console.error('Error evaluating expression:', error);
                }
            } else {
                inputText_edt.textContent = inputText_edt;
                event1.target.textContent = inputText_edt;
            }
        }
    });

});


let form_val = document.getElementById('form_id');
form_val.addEventListener('change',function (event_lables) {

    // console.log('Changed input:', event_lables.target.name);
    // console.log('Current backgroundColor value:', form_val['backgroundColor'].value);
    // console.log('Current cell backgroundColor:', selected_cell.style.backgroundColor);
    
    //all vales from filter
    let lable_data_obj = {
        fontSize : form_val['fontSize'].value,
        fontWeight : form_val['fontWeight'].checked,
        fontStyle : form_val['fontStyle'].checked,
        textDecoration : form_val['textDecoration'].checked,
        textAlign : form_val['textAlign'].value,
        color : form_val['color'].value,
        backgroundColor: form_val['backgroundColor'].value
    }
    // console.log('label_data_obj backgroundColor:', lable_data_obj.backgroundColor);
    // console.log(lable_data_obj);
    
    selected_cell.style.fontSize = lable_data_obj.fontSize + 'px';
    selected_cell.style.fontWeight = lable_data_obj.fontWeight?'bold':'normal';
    selected_cell.style.fontStyle = lable_data_obj.fontStyle?'Italic':'normal';
    selected_cell.style.textDecoration = lable_data_obj.textDecoration?'underline':'none';
    selected_cell.style.textAlign = lable_data_obj.textAlign;
    selected_cell.style.color = lable_data_obj.color || "#000000";
    selected_cell.style.backgroundColor = lable_data_obj.backgroundColor || "#ffffff";

});

//this function return in rgb format with default white;
function rgbToHex(rgb) {
    // If it's already a hex value, return it
    if (rgb.startsWith('#')) return rgb;
    // If it's rgb format, convert it
    if (rgb.startsWith('rgb')) {
        const [r, g, b] = rgb.match(/\d+/g);
        return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
    }
    // Default to white if no valid format
    return '#ffffff';
}

//value back to lables 
function cell_value_to_lable() {  
    form_val['fontSize'].value = selected_cell.style.fontSize ? parseInt(selected_cell.style.fontSize) : `16px`;
  
    form_val['fontWeight'].checked = selected_cell.style.fontWeight === 'bold';
    form_val['fontStyle'].checked = selected_cell.style.fontStyle === 'italic';
    form_val['textDecoration'].checked = selected_cell.style.textDecoration === 'underline';
    
    let textAlign = selected_cell.style.textAlign || 'left';
    let radio = document.querySelector(`input[name="textAlign"][value="${textAlign}"]`);
    console.log(radio);
    if (radio) radio.checked = true;
  
    form_val['color'].value = rgbToHex(selected_cell.style.color || '#000000');
    form_val['backgroundColor'].value = rgbToHex(selected_cell.style.backgroundColor || '#ffffff');
}

let toggle_arrow_var = document.getElementById('toggle_arrow');
let keyboard_arrow_up_val = document.getElementById('keyboard_arrow_up');
let keyboard_arrow_down_val = document.getElementById('keyboard_arrow_down');
let upper_val = document.getElementById('upper_part');

toggle_arrow_var.addEventListener('click',function (e) {
    if (e.target.checked) {
        console.log('check');
        upper_val.style.visibility = "hidden";
        upper_val.style.height = "0px";
        upper_val.style.width = "0px";
        // keyboard_arrow_down_val.style.visibility = "visible";
        // keyboard_arrow_up_val.style.visibility = "hidden";
        keyboard_arrow_up_val.textContent = "keyboard_arrow_down";
        console.log(keyboard_arrow_up_val.textContent);
        

    }else{
        console.log('uncheck');
        upper_val.style.visibility = "visible";
        upper_val.style.height = "70px";
        upper_val.style.width = "100%";
        // keyboard_arrow_up_val.style.visibility = "visible";
        // keyboard_arrow_down_val.style.visibility = "hidden";
        keyboard_arrow_up_val.textContent = "keyboard_arrow_up";
    }

});



