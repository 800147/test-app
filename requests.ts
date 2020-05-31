//getAllDrones
fetch('/drones', {
    method: 'GET',
});

//getAllDrones - pages
fetch('/drones_page=2&_limit=3', {
    method: 'GET',
});

//getCustomDrone
fetch('/drones/1', {
    method: 'GET',
});

// getFavDrones
fetch('/drones?isFavorite=true', {
    method: 'GET',
});

// delete drone
fetch('/drones/1', {
    method: 'DELETE',
});

// update drone
fetch('/drones/1', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        isFavorite: true,
    }),
});

// add drone
fetch('/drones', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'new drone',
        isFavorite: false,
    }),
});

//getAllFP
fetch('/flightPlans', {
    method: 'GET',
});

// delete fp
fetch('/flightPlans/1', {
    method: 'DELETE',
});

// add fp
fetch('/flightPlans', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        description: 'new fp descr',
        status: 'initial',
        drones: [],
    }),
});

// update fp
fetch('/flightPlans/1', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        status: 'started',
    }),
});
