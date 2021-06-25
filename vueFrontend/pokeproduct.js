
new Vue({
  el: '#sixthTable',
  data() {
	 return{ 
    currentPage: 1,
    elementsPerPage: 5,
    ascending: false,
    sortColumn: '',
	rows: []
	}
  },
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
	"DescriptionClick": function DescriptionClick() {
		var index = 0;
		for(let i = 0; i < this.rows.length; i ++)
		{
			if(event.target.id == this.rows[i].Description)
			{
				index = i;
			}				
		}
		localStorage.username = "dummy2"
		localStorage.id = event.target.id
		localStorage.url = this.rows[index].Image
		localStorage.product = this.rows[index].Product
		localStorage.price = this.rows[index].Price
		localStorage.likes = this.rows[index].Likes
			
		window.location.href = 'description.html'
    },
    "num_pages": function num_pages() {
      return Math.ceil(this.rows.length / this.elementsPerPage);
    },
    "get_rows": function get_rows() {
      var start = (this.currentPage-1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.rows.slice(start, end);
    },
    "change_page": function change_page(page) {
      this.currentPage = page;
    }
  },
  computed: {
    "columns": function columns() {
      if (this.rows.length == 0) {
        return [];
      }
	return Object.keys(this.rows[0])
    }
  }
});