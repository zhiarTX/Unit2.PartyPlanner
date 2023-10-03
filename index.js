const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/parties'
const state ={
    parties:[]
}
const partyList = document.querySelector ('parties')
const addPartyForm = document.querySelector('#addParty')
addPartyForm.addEventListener("submit", addParty);

// a function to fetch the list of parties 
async function getParties(){
    try{
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json;
    } catch(err){
        console.log(err)
    }
}

// a function to fetch and post a new party

async function createParty(name,date,time,location,description){
    try {
        const response = await fetch(API_URL, {
            method: "Post",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({name,date,time,location,description}),
        });
        const json = await response.json();
        if (json.err){
            throw new Error(json.message);
        }
        render();
    } catch (err){
        console.err(err);
    }
}

// a function to delete a party
async function deleteParty(id){
    try{
        const response = await fetch('${API_URL}/${id}', {
            method: "DELETE",
        });
        if(!response.ok){
            throw new Error("Party could not be deleted");
        }
    render();
    }catch (err){
        console.log(err)
    }
}

// Handles responding to the event by calling createParty()
async function addParty(event){
    event.preventDefault();
    await createParty(
        addPartyForm.name.value,
        addPartyForm.date.value,
        addPartyForm.time.value,
        addPartyForm.location.value,
        addPartyForm.description.value,
    );
        addPartyForm.name.value = '';
        addPartyForm.date.value = '';
        addPartyForm.time.value = '';
        addPartyForm.location.value = '';
        addPartyForm.description.value = '';
}