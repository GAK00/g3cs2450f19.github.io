function shiftBeads(beadId)
{
    var row = parseInt(beadId.charAt(5), 10);
    var bead = parseInt(beadId.charAt(7), 10);

    var oldSpace;
    var oldSpaceNum;
    var oldSpaceOffset = 0;

    if(bead > 2)
    {
        oldSpaceOffset = rowCount;
    }

    oldSpace = document.getElementsByClassName("grow-space")[row + oldSpaceOffset - 1];
    oldSpaceNum = parseInt(oldSpace.id.charAt(8), 10);

    // example: bead-2-5 is clicked. This is the middle bead on the bottom part of the second row
    // The oldSpace is the grow-space element in the second bottom row, or space-2-3
    // the space # (3) is less than the bead # (5), so the bead needs to be moved up
    //    and the space below the bead (space-1-6) needs to be grown

    var newSpaceNumOffset = 0;

    if(bead > 2 && oldSpaceNum <= bead)
    {
        newSpaceNumOffset = 1;
    }
    else if(bead <= 2 && oldSpaceNum >= bead)
    {
        newSpaceNumOffset = -1;
    }

    var newSpace = document.getElementById("space-" + row + "-" + (bead + newSpaceNumOffset));

    if(oldSpace === null || newSpace === null)
    {
        console.log("Jesse debug @ shiftBeads, oldSpace and newSpace are " + oldSpace + " and " + newSpace);
    }

    oldSpace.className = 'space';
    newSpace.className = 'space';

    newSpace.classList.add("grow-space");
    oldSpace.classList.add("space-shrink");
    newSpace.classList.add("space-grow");
	console.log(calculate_value());
}

function solve()
{
    var value = Math.floor(document.getElementById("input").value);
    document.getElementById("input").value = value;

    for(var i = 0; i < rowCount; i++)
    {
        var digit = value % Math.pow(10, i + 1);
        if(digit < Math.pow(10, i))
        {
            digit = 0;
        }
        else
        {
            while(digit > 9)
            {
                digit = Math.floor(digit / 10);
            }
        }

        setRow(rowCount - i, digit);
    }
}

function setRow(column, digit)
{
    var topBeadsDiv = document.getElementById("top-row-" + column);
    var bottomBeadsDiv = document.getElementById("bottom-row-" + column);

    var topValue = Math.floor(digit / 5);
    var bottomValue = digit % 5;
    
    for(var i = 0; i < 9; i++)
    {
        var spaceDiv = document.getElementById("space-" + column + "-" + i);
        var isGrown = hasClass(spaceDiv, "grow-space")

        if(i !== (2 - topValue) && i !== (3 + bottomValue) && isGrown) // needs to shrink
        {
            spaceDiv.className = 'space';
            spaceDiv.classList.add("space-shrink");
        }
        else if((i === (2 - topValue) || i === (3 + bottomValue)) && !isGrown) // needs to grow
        {
            spaceDiv.className = 'space';
            spaceDiv.classList.add("grow-space");
            spaceDiv.classList.add("space-grow");
        }
    }
}

function reset()
{
    for(var i = 1; i <= rowCount; i++)
    {
        setRow(i, 0);
    }
}

function hasClass(div, className)
{
    returnVal = false;
    for(var i = 0; i < div.classList.length; i++)
    {
        if(div.classList[i] === className)
        {
            returnVal = true;
        }
    }
    return returnVal;
}

//handles switching the buttons for each screen
function show_screen(name, sender)
{
	for ( var child of document.getElementById("left-sidebar").childNodes)
	{
		if(child.className && child.className.includes("button"))
		{
			child.className = "button";
		}
	}
	sender.className = "button button_selected";
	for ( var child of document.getElementById("right-sidebar").childNodes)
	{
		if(child.id != "nav-reset")child.style = "display: none";
	}
	document.getElementById("display-mode").innerHTML = name;
	document.getElementById("display-mode").style = "display: block"
	name = name.toLowerCase() + "-opts";
	document.getElementById(name).style = "display: block";
	document.getElementById("input").value = null;
	reset()
}

//really bad gets the value of the buttons
function calculate_value()
{
	var row_val = rowCount - 1;
	var total_val = 0;
	for (row of document.getElementById("abacus-bottom").childNodes)
	{
		var col_val = 0;
		for(bead of row.childNodes)
		{
			if(bead.className.includes("grow-space")) break;
			if(bead.className.includes("bead")) col_val++;
		}
		total_val += col_val * Math.pow(10, row_val)
		row_val --;
	}
	var row_val = rowCount - 1;
	for (row of document.getElementById("abacus-top").childNodes)
	{
		var col_val = 2;
		for(bead of row.childNodes)
		{
			if(bead.className.includes("grow-space")) break;
			if(bead.className.includes("bead")) col_val--;
		}
		total_val += col_val * Math.pow(10, row_val) * 5
		row_val --;
	}
	return total_val;
}

function submit_answer()
{
	let answer = calculate_value();
	let correct_answer = levels["level_1"][problem][1];
	if(answer != correct_answer) document.getElementById("nav-submit").innerHTML = "<p style=\"color:red; margin : auto\">Incorrect</p>"
	else
	{
		document.getElementById("nav-submit").innerHTML = "<p style=\"color:green; margin : auto\">Correct</p>"
		problem++;
		if(problem >= levels["level_1"].length)
		{
			document.getElementById("display-question").innerHTML = "level 1 complete";
			document.getElementById("nav-submit").onclick = null;
		}
		else
		{
			document.getElementById("display-question").innerHTML = levels["level_1"][problem][0]
		}
	}
	setTimeout(() => {document.getElementById("nav-submit").innerHTML = "Submit";}, 2000);
}