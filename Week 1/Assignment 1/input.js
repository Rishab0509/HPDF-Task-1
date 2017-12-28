var request  = new XMLHttpRequest();
var submit = document.getElementById('submit');
var inp = document.getElementById('inp');

submit.onclick=function()
{
	var value = inp.value;
	request.onreadystatechange=function()
	{
		if(request.readyState===XMLHttpRequest.DONE)
		{
			if(request.status===200)
			{
				document.write(request.response);
			}
		}

	}
	request.open('POST','/takevalue',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({"value" :value}));
}