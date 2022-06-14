import React, { useState } from 'react';
import axios from 'axios';

const FindMemoryIdx = async() => {

    const [ memoryIdx, setMemoryIdx ] = useState({})

    const date = localStorage.getItem('date')
    const sessionId = localStorage.getItem("sessionId");

    console.log('메모리 받을게~')
    const res = await axios('/api/findMemoryIdx', {
        method: 'POST',
        data: {
            'search_memory_date': date,
            'creator_id': sessionId
        },
    headers: new Headers()
    });

    setMemoryIdx(res.data)
    
    console.log("memoryIdx: " + memoryIdx)
    if(memoryIdx !== null) {
        const memory_idx = ''
        memory_idx = memoryIdx[0].memory_idx
        localStorage.setItem("memoryIdx", memory_idx);
        console.log("memoryIdx[0]: " + memory_idx)
    } else {
        console.log('없음')
    }
}

export default FindMemoryIdx;