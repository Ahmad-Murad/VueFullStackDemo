var test = new Vue({ 
    el: '#ItemDesc',
    data() {
		return{ 
			username: "",
			img: "",
			type: "",
			product:"",
			price: 0,
			likes:0,
			description: "",
			likebool: null,
			
		}
	},
	mounted (){
		axios
		.get("http://localhost:8081/GetProductDescType/?val=" + localStorage.id)
		.then(response => {
		console.log(JSON.stringify(response.data));  
		var temp = JSON.parse(JSON.stringify(response.data))
		console.log(temp[0].Description)
		this.description = temp[0].Description
		this.type = temp[0].Type
		console.log(this.description)
		});
		axios
		.get("http://localhost:8081/CheckLiked/?username=" + localStorage.username + "&product_name=" + localStorage.product)
		.then(response => {
		var temp = JSON.parse(JSON.stringify(response.data))
		console.log(temp[0].liked)	
		if(temp[0].liked == 0)
		{
			document.getElementById("likebutton").innerHTML = "like";
			this.likebool = false			
		}
		else
		{
			this.likebool = true
			
			document.getElementById("likebutton").innerHTML = "unlike"; //INSECURE!!
		}	
		});
		this.product = localStorage.product
		this.price = localStorage.price
		this.likes = localStorage.likes
		this.img = localStorage.url
		this.username = localStorage.username
	 
		
},
	methods:
	{
		"GoBack": function GoBack() {
		window.location.href = 'pokeproduct.html'
		},	
		"Like": function Like() {
			if(this.likebool == true)
			{
				document.getElementById("likebutton").innerHTML = "like";
				this.likebool = false
				this.likes--
			}
			else
			{
				document.getElementById("likebutton").innerHTML = "unlike";
				this.likebool = true
				this.likes++
			}
			
			const data = {data:{username:this.username,product_name:this.product}};
			const url = "http://localhost:8081/like"
			console.log(data)
			axios.post(url,data)
		}
		
	}
});
	