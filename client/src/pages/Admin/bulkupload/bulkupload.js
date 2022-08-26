import React from "react";
// import { MDBFile } from "mdb-react-ui-kit";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import axios from "axios";

function Bulkupload() {
    const [file, setFile] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const reader = new FileReader();

    function handlechange(e) {
        setSuccessMsg("");
        setErrMsg("");
        setFile(e.target.files[0]);
    }

    function handleParse(e) {
        if (!file) console.log("Enter a valid file");
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            let filterone = csv.data.filter((i) => i.name != ""&&i.description !=""&& i.price !=""&&i.category !="");
            console.log(filterone);
            axios
                .post("http://localhost:3003/admin/uploadcsvdata", {
                    csvdata: filterone,
                })
                .then((res) => {
                    setSuccessMsg(res.data.msg);
                    console.log(res.data.msg);
                })
                .catch((err) => {
                    console.log(err);
                    setErrMsg(err)
                });
        };
        reader.readAsText(file);
    }
    reader.abort();
    return (
        <div class="content-wrapper">
            <div class="container-fluid">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Bulk Upload</li>
                </ol>
                <div class="row g-3">
                    <h1 class="text-start">Bulk Upload</h1>
                    <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label">Upload images</label>
                    </div>
                    <div class="col-auto">
                        <input type="file" onChange={handlechange} id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" />
                    </div>
                    <div class="col-auto">
                        <span id="passwordHelpInline" class="form-text">
                        </span>
                    </div>

                    <button type="button" onClick={handleParse} class="btn btn-info" style={{ "width": "100px" }}>submit</button>
                    <p className="success-text">{successMsg}</p>
                    <p className="err-text">{errMsg}</p>
                </div>
            </div>
        </div>
    )
}
export default Bulkupload