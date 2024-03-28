var page = 0;
showTab(page);

function showTab(n) {
    var x = document.getElementsByClassName("page");
    var b = document.getElementsByClassName("box");
    b[page].style.opacity = "1";
    if(page > 0) b[page - 1].style.opacity = "0.8";
    if(page < b.length - 1) b[page + 1].style.opacity = "0.8";
    document.getElementById('submit').style.display = "none"
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById('nextBtn').style.display = "none";
        document.getElementById('submit').style.display = "inline";
    } else {
        document.getElementById('nextBtn').style.display = "inline";
    }
}

function nextPrev(n) {
    if (n == 1 && !validate(page)) return false;
    var x = document.getElementsByClassName("page");
    document.getElementById('submit').style.display = "none"
    x[page].style.display = "none";
    page = page + n;
    showTab(page);
}

function handleExperienceAdd() {
    var row = document.getElementsByClassName('experience')[0];
    const inputs = row.lastElementChild.getElementsByTagName('input');
    if (row.lastElementChild) {
        for (let i = 1; i < inputs.length; i++) {
            if (inputs[i].value == '') { document.getElementById('exp_error').innerHTML = "Please fill previous fields"; return false; }
            else if (!/^[a-zA-Z0-9.-\s]*$/.test(inputs[i].value)) { document.getElementById('exp_error').innerHTML = "0-9 / a - z"; return false; }
        }
    }
    const element = document.createElement('div');
    element.setAttribute("class", "exp");
    element.innerHTML = `
        <label for="com_1">Company Name</label>
        <input type="text" name="com_1[]" class="com_1">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label for="designation_1">Designation</label>
        <input type="text" name="designation_1[]" class="designation_1">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label for="from_1">From</label>
        <input type="text" name="from_1[]" class="from_1">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label for="to_1">To</label>
        <input type="text" name="to_1[]" class="to_1"><br /><br />
    `;
    row.appendChild(element);
}

function handleExperienceRemove() {
    var rows = document.getElementsByClassName('experience');
    if (rows[0].getElementsByClassName('exp').length > 1) rows[0].removeChild(rows[0].lastElementChild);
}

function handleRefAdd() {
    var row = document.getElementsByClassName('reference_contact')[0];
    const inputs = row.lastElementChild.getElementsByTagName('input');
    if (row.lastElementChild) {
        for (let i = 1; i < inputs.length; i++) {
            if (inputs[i].value == '') { document.getElementById('ref_error').innerHTML = "Please fill previous fields"; return false; }
            else if (!/^[a-zA-Z0-9.-\s]*$/.test(inputs[i].value)) { document.getElementById('ref_error').innerHTML = "fill values between range 0-9"; return false; }
        }
    }
    const element = document.createElement('div');
    element.setAttribute("class", "ref");
    element.innerHTML = `
        <label for="ref_1">Name</label>
        <input type="text" name="ref_1[]" class="ref_1">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label for="contact_1">Contact Number</label>
        <input type="text" name="contact_1[]" class="contact_1">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label for="relation_1">Relation</label>
        <input type="text" name="relation_1[]" class="relation_1"><br /><br />
    `;
    row.appendChild(element);
}

function handleRefRemove() {
    var rows = document.getElementsByClassName('reference_contact');
    if (rows[0].getElementsByClassName('ref').length > 1) rows[0].removeChild(rows[0].lastElementChild);
}

function handleEducationAdd() {
    var row = document.getElementsByClassName('education')[0];
    const inputs = row.lastElementChild.getElementsByTagName('input');
    if (row.lastElementChild) {
        for (let i = 1; i < inputs.length; i++) {
            if (inputs[i].value == '') { console.log("true"); document.getElementById('edu_error').innerHTML = "Please fill previous fields"; return false; }
            else if (!/^\d+/.test(inputs[i].value)) { console.log("true_2"); document.getElementById('edu_error').innerHTML = "fill values between range 0-9"; return false; }
        }
    }
    const element = document.createElement('div');
    element.setAttribute("class", "edu");
    element.innerHTML = `
        <select name="board[]">
            <option value="ssc">SSC</option>
            <option value="hsc">HSC</option>
            <option value="be">BE</option>
            <option value="me">ME</option>
            <option value="phd">PHD</option>
        </select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label for="passing">Passing Year</label>
        <input type="text" name="passing[]" id="passing">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label for="per">Percentage</label>
        <input type="text" name="per[]" id="per"><br /><br />
    `;
    row.appendChild(element);
}

function handleEducationRemove() {
    var rows = document.getElementsByClassName('education');
    if (rows[0].getElementsByClassName('edu').length > 1) rows[0].removeChild(rows[0].lastElementChild);
}


function validate(page) {
    const fields = document.getElementsByTagName('input');
    const span = document.getElementsByTagName('span');
    var isValid = true;

    for (let i = 0; i < fields.length; i++) {
        const x = document.forms["myform"][fields[i].name];
        if (page === 0) {
            if (x.name == 'fname') {
                if (x.value == '') { document.getElementById("e_fname").innerHTML = "*field required"; isValid = false; }
                else if (!/^[a-zA-Z\s]*$/.test(x.value)) { document.getElementById("e_fname").innerHTML = "field contain only letters"; isValid = false; }
            }
            if (x.name == 'city') {
                if (x.value == '') { document.getElementById("e_city").innerHTML = "*field required"; isValid = false; }
                else if (!/^[a-zA-Z\s]*$/.test(x.value)) { document.getElementById("e_city").innerHTML = "field contain only letters"; isValid = false; }
            }
            if (x.name == 'lname') {
                if (x.value == '') { document.getElementById("e_lname").innerHTML = "*field required"; isValid = false; }
                else if (!/^[a-zA-Z\s]*$/.test(x.value)) { document.getElementById("e_lname").innerHTML = "field contain only letters"; isValid = false; }
            }
            if (x.name == 'designation') {
                if (x.value == '') { document.getElementById("e_designation").innerHTML = "*field required"; isValid = false; }
                else if (!/^[a-zA-Z0-9.-\s]*$/.test(x.value)) { document.getElementById("e_designation").innerHTML = "designation not valid"; isValid = false; }
            }
            if (x.name == 'email') {
                if (x.value == '') { document.getElementById("e_email").innerHTML = "*field required"; isValid = false; }
                else if (!/^[\w-\.\s]+@([\w-\s]+\.)+[\w-\s]{2,4}$/.test(x.value)) { document.getElementById("e_email").innerHTML = "email not valid"; isValid = false; }
            }
            if (x.name == 'address_1') {
                if (x.value == '') { document.getElementById("e_address_1").innerHTML = "*field required"; isValid = false; }
                else if (!/^[a-zA-Z0-9.,\s]*$/.test(x.value)) { document.getElementById("e_address_1").innerHTML = "address not valid"; isValid = false; }
            }
            if (x.name == 'address_2') {
                if (x.value == '') { document.getElementById("e_address_2").innerHTML = "*field required"; isValid = false; }
                else if (!/^[a-zA-Z0-9.,\s]*$/.test(x.value)) { document.getElementById("e_address_2").innerHTML = "address not valid"; isValid = false; }
            }
            if (x.name == 'phone') {
                if (x.value == '') { document.getElementById("e_phone").innerHTML = "*field required"; isValid = false; }
                else if (x.value.length != 10) { document.getElementById("e_phone").innerHTML = "invalid length"; isValid = false; }
                else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(x.value)) { document.getElementById("e_phone").innerHTML = "phone number not valid"; isValid = false; }
            }
            if (x.name == 'state') {
                if (x.value == '') { document.getElementById('e_state').innerHTML = "*field required"; isValid = false; }
                else if (!/^[a-zA-Z\s]*$/.test(x.value)) { document.getElementById('e_state').innerHTML = "state not valid"; isValid = false; }
            }
            if (x.name == 'zip') {
                if (x.value == '') { document.getElementById('e_zip').innerHTML = "*field required"; isValid = false; }
                else if (x.value.length != 6) { document.getElementById('e_zip').innerHTML = "invalid length"; isValid = false; }
                else if (!/^\d+$/.test(x.value)) { document.getElementById('e_zip').innerHTML = "zipcode not valid"; isValid = false; }
            }
            if (x.name == 'DOB') {
                if (x.value == '') { document.getElementById('e_DOB').innerHTML = "*field required"; isValid = false; }
                else if (!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(x.value)) { document.getElementById('e_DOB').innerHTML = "date not valid"; isValid = false; }
            }
        }
        if (page === 3) {
            if (document.getElementById("r_h").checked || document.getElementById("w_h").checked || document.getElementById("s_h").checked) {
                document.getElementById("hindi").checked = true;
            }
            else if (document.getElementById('hindi').checked) {
                if (!document.getElementById("r_h").checked || !document.getElementById("w_h").checked || !document.getElementById("s_h").checked) {
                    document.getElementById('e_hindi').innerHTML = "*check required"; isValid = false;
                }
            }
            if (document.getElementById("r_e").checked || document.getElementById("w_e").checked || document.getElementById("s_e").checked) {
                document.getElementById("english").checked = true;
            }
            else if (document.getElementById('english').checked) {
                if (!document.getElementById("r_e").checked || !document.getElementById("w_e").checked || !document.getElementById("s_e").checked) {
                    document.getElementById('e_english').innerHTML = "*check required"; isValid = false;
                }
            }
            if (document.getElementById("r_g").checked || document.getElementById("w_g").checked || document.getElementById("s_g").checked) {
                document.getElementById("gujarati").checked = true;
            }
            else if (document.getElementById('gujarati').checked) {
                if (!document.getElementById("r_g").checked || !document.getElementById("w_g").checked || !document.getElementById("s_g").checked) {
                    document.getElementById('e_gujarati').innerHTML = "*check required"; isValid = false;
                }
            }
            if (document.getElementById("b_p").checked || document.getElementById("m_p").checked || document.getElementById("a_p").checked) {
                document.getElementById("php").checked = true;
            }
            else if (document.getElementById('php').checked) {
                if (!document.getElementById("b_p").checked || !document.getElementById("m_p").checked || !document.getElementById("a_p").checked) {
                    document.getElementById('e_php').innerHTML = "*check required"; isValid = false;
                }
            }
            if (document.getElementById("b_m").checked || document.getElementById("m_m").checked || document.getElementById("a_m").checked) {
                document.getElementById("mysql").checked = true;
            }
            else if (document.getElementById('mysql').checked) {
                if (!document.getElementById("b_m").checked || !document.getElementById("m_m").checked || !document.getElementById("a_m").checked) {
                    document.getElementById('e_mysql').innerHTML = "*check required"; isValid = false;
                }
            }
            if (document.getElementById("b_l").checked || document.getElementById("m_l").checked || document.getElementById("a_l").checked) {
                document.getElementById("laravel").checked = true;
            }
            else if (document.getElementById('laravel').checked) {
                if (!document.getElementById("b_l").checked || !document.getElementById("m_l").checked || !document.getElementById("a_l").checked) {
                    document.getElementById('e_laravel').innerHTML = "*check required"; isValid = false;
                }
            }
            if (document.getElementById("b_o").checked || document.getElementById("m_o").checked || document.getElementById("a_o").checked) {
                document.getElementById("oracle").checked = true;
            }
            else if (document.getElementById('oracle').checked) {
                if (!document.getElementById("b_o").checked || !document.getElementById("m_o").checked || !document.getElementById("a_o").checked) {
                    document.getElementById('e_oracle').innerHTML = "*check required"; isValid = false;
                }
            }
        }
        if (page === 5) {
            if (x.name == 'notice') {
                if (x.value == '') { document.getElementById('e_notice').innerHTML = "*"; isValid = false; }
                else if (!/^[a-zA-Z0-9.-\s]*$/.test(x.value)) { document.getElementById('e_notice').innerHTML = "a-z,0-9,."; isValid = false; }
            }
            if (x.name == 'expected') {
                if (x.value == '') { document.getElementById('e_expected').innerHTML = "*"; isValid = false; }
                else if (!/^[a-zA-Z0-9.-\s]*$/.test(x.value)) { document.getElementById('e_expected').innerHTML = "a-z,0-9,."; isValid = false; }
            }
            if (x.name == 'current') {
                if (x.value == '') { document.getElementById('e_current').innerHTML = "*"; isValid = false; }
                else if (!/^[a-zA-Z0-9.-\s]*$/.test(x.value)) { document.getElementById('e_current').innerHTML = "a-z,0-9,."; isValid = false; }
            }
        }
    }
    return isValid;
}

async function submitForm() {

    if (!validate(page)) { return false; }

    let formdata = document.getElementById('form')
    const details = new FormData(formdata);
    const params = new URLSearchParams(details);
    const jobdata = await new Response(params).text();

    const response = await fetch("http://localhost:7500/ajax/submit", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: jobdata
    });

    const r = await response.json();

    document.getElementById("show").innerHTML = r.msg;

}

async function updateForm() {

    if (!validate(page)) { return false; }

    let formdata = document.getElementById('form');
    const details = new FormData(formdata);
    const params = new URLSearchParams(details);
    const jobdata = await new Response(params).text();

    const response = await fetch("http://localhost:7500/ajax/updated", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: jobdata
    });

    const r = await response.json();

    document.getElementById("show").innerHTML = r.msg;

}