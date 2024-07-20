const button = document.querySelector("button");
button.addEventListener("click",()=> {
    Notification.requestPermission().then(perm => {
        if (perm === "granted"){ new Notification("example", {
            body: "This is a test notification",
            data:{hello:"world"}
        })
    
    }
    })
})