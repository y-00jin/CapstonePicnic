const GetValues = () => {
    const inputPlace = document.getElementById('place');
    localStorage.setItem('place', inputPlace.value)

    const inputRecord = document.getElementById('record');
    localStorage.setItem('place', inputRecord.value)
}

export default GetValues;