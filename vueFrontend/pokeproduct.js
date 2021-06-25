/*
Vue that controls the paginated table that displays the pokemart data from the backend
*/
new Vue({
  el: '#pageTable',
  data() {
	 return{ 
    currentPage: 1,
    elementsPerPage: 5,
    ascending: false,
    sortColumn: '',
	rows: []
	}
  },
  /*
	When the app loads, axios will send a get request for the data from the NodeJs backend, the backend will send basic info on all the items as
	data:[{"Image":"url","Product":"Product name","Price":123,"Likes":123,"DescriptionId":123},{....},...]		
  */
   mounted() {
     axios
      .get("http://localhost:8081/GetProductsBasic")
      .then(response => {
	  console.log(JSON.stringify(response.data));  
      this.rows = JSON.parse(JSON.stringify(response.data))
	  console.log(this.rows)	
      });
	},
	
  methods: {
    /*
	Method that sorts tables based on the ascending variable
	*/
	"sortTable": function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.rows.sort(function(a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1
        }
        return 0;
      })
    },
	 /*
	Method that is activated by the see more button of a row, and changes the outcome based on the specific buttonID
	Since rows may not be in order, we need to cycle through the list to find the row that matches button.id	
	*/
	"DescriptionClick": function DescriptionClick() {
		var index = 0;
		for(let i = 0; i < this.rows.length; i ++)
		{
			if(event.target.id == this.rows[i].DescriptionId)
			{
				index = i;
			}				
		}
		/*
		This username would be supplied by the login page, but given that it is not implemented yet, this is where it is hardcoded,
		the database contains two user "dummy" and "dummy2", more can be added through there to further rigorusly test like functionality,
		as liking a product is tied to the user and the product
		*/
		localStorage.username = "dummy"
		localStorage.id = event.target.id
		localStorage.url = this.rows[index].Image
		localStorage.product = this.rows[index].Product
		localStorage.price = this.rows[index].Price
		localStorage.likes = this.rows[index].Likes
			
		window.location.href = 'description.html'
    },
	/*
	Helper method to get the number of pages necessary for pagination
	*/
    "num_pages": function num_pages() {
      return Math.ceil(this.rows.length / this.elementsPerPage);
    },
	/*
	Helper method to get the number of rows per page
	*/
    "get_rows": function get_rows() {
      var start = (this.currentPage-1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.rows.slice(start, end);
    },
	/*
	Method that changes the page of the tables
	*/
    "change_page": function change_page(page) {
      this.currentPage = page;
    }
  },
  computed: {
    /*
	Helper method to get columns
	*/
	"columns": function columns() {
      if (this.rows.length == 0) {
        return [];
      }
	return Object.keys(this.rows[0])
    }
  }
});