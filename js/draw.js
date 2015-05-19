var draw = {
    Resizer: function(ctx){
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    },
    Menu: function(ctx){
        ctx.beginPath();
        ctx.rect(3, 3, 150, 100);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.font = "20px Verdana";
        ctx.fillStyle = "#000";
        ctx.fillText("Legend", 40, 25);
    }
};