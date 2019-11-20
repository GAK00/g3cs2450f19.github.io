var rowCount = 2;
var level = 1;
var problem = 0;

(function()
{
	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete')
		{
            clearInterval(stateCheck);
            addBeads(rowCount);
			document.getElementById("display-question").innerHTML = levels["level_1"][0][0]
		}
	}, 100);
})();

function addBeads(newRowCount)
{
    rowCount = newRowCount
    var abacusTopHTML = '';
    var abacusBottomHTML = '';
    var beadClasses = "bead normal-bead";
    if(rowCount > 12)
    {
        beadClasses = "bead skinny-bead";
    }

    for(var i = 1; i <= rowCount; i++)
    {
        abacusTopHTML += "<div id=\"top-row-" + i + "\" class=\"top-row\">" +
                        "<div id=\"space-" + i + "-0\" class=\"space\"></div>" +
                        "<div id=\"bead-" + i + "-1\" class=\"" + beadClasses + "\"></div>" +
                        "<div id=\"space-" + i + "-1\" class=\"space\"></div>" +
                        "<div id=\"bead-" + i + "-2\" class=\"" + beadClasses + "\"></div>" +
                        "<div id=\"space-" + i + "-2\" class=\"space grow-space\"></div></div>";
        abacusBottomHTML += "<div id=\"bottom-row-" + i + "\" class=\"bottom-row\">" +
                        "<div id=\"space-" + i + "-3\" class=\"space grow-space\"></div>" +
                        "<div id=\"bead-" + i + "-3\" class=\"" + beadClasses + "\"></div>" +
                        "<div id=\"space-" + i + "-4\" class=\"space\"></div>" +
                        "<div id=\"bead-" + i + "-4\" class=\"" + beadClasses + "\"></div>" +
                        "<div id=\"space-" + i + "-5\" class=\"space\"></div>" +
                        "<div id=\"bead-" + i + "-5\" class=\"" + beadClasses + "\"></div>" +
                        "<div id=\"space-" + i + "-6\" class=\"space\"></div>" +
                        "<div id=\"bead-" + i + "-6\" class=\"" + beadClasses + "\"></div>" +
                        "<div id=\"space-" + i + "-7\" class=\"space\"></div>" +
                        "<div id=\"bead-" + i + "-7\" class=\"" + beadClasses + "\"></div>" +
                        "<div id=\"space-" + i + "-8\" class=\"space\"></div></div>";
    }

    document.getElementById("abacus-top").innerHTML = abacusTopHTML;
    document.getElementById("abacus-bottom").innerHTML = abacusBottomHTML;

    setupBeads(rowCount);
    connectButtons();
}

function setupBeads(rowCount)
{
    for(var i = 1; i <= rowCount; i++)
    {
        for(var j = 1; j <= 7; j++)
        {
            document.getElementById("bead-" + i + "-" + j).onclick = function() {shiftBeads(this.id);document.getElementById("input").value = null;};
        }
    }
    colorBeads(rowCount);
}

function colorBeads(rowCount)
{
    var beads = document.getElementsByClassName("bead");
    var hueOffset = 255 / rowCount;

    for(var i = 0; i < rowCount * 2; i ++)
    {
        beads[i].style.background = "hsl(" + (0 + Math.floor(i/2) * hueOffset) + ", 80%, 40%)";
    }
    
    for(var i = rowCount * 2; i < beads.length; i++)
    {
        beads[i].style.background = "hsl(" + (0 + Math.floor((i - (rowCount * 2))/5) * hueOffset) + ", 80%, 40%)";
    }
}

function connectButtons()
{
    document.getElementById("nav-solve").onclick = function() {solve()};
    document.getElementById("input").addEventListener("keyup", function(event)
    {
        if (event.key === "Enter")
        {
            solve();
        }
    });
    document.getElementById("nav-reset").onclick = function() {reset()};
	document.getElementById("nav-exercises").onclick = function(){show_screen('Exercises', this)};
	document.getElementById("nav-practice").onclick = function(){show_screen('Practice', this)};
	document.getElementById("nav-show").onclick = function(){document.getElementById("input").value = calculate_value()};
	document.getElementById("nav-submit").onclick = function(){submit_answer()};
}