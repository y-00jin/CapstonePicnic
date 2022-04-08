import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MemoryWrite(){
    return(
            <div>
                <p></p>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">여행 날짜</span>
                    <input type="text" class="form-control" placeholder=" " aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
      
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">여행 장소</span>
                    <input type="text" class="form-control" placeholder=" " aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
      
                <div class="input-group">
                    <span class="input-group-text">여행 기록</span>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                </div>
            </div>
    );
}

export default MemoryWrite;