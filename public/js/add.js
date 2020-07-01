const storeForm = document.getElementById('store-form')
const storeId = document.getElementById('store-id')
const storeAddress = document.getElementById('store-address')

// Send POST to API to add store
async function addStore(event) {
    event.preventDefault();
    if(storeId.value === '' || storeAddress.value === '') {
        console.log('Please fill in fields')
    }

    const sendBody = {
        storeId: storeId.value,
        address: storeAddress.value
    }

    try {
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(sendBody)
        })
        if(res.status === 400) {
            throw Error('Store already exists')
        }
        console.log('Store added')
        window.location.href="/index.html";
    } catch(err) {
        console.log(err)
        return
    }
}

storeForm.addEventListener('submit', addStore)