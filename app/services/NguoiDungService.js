function NguoiDungService(){
    this.layDSNguoiDung = function(){
        return axios({
            method: "GET",
            url:"http://5dce9e1775f9360014c26016.mockapi.io/api/nguoidung"
        })
            
    };


    //Them Nguoi Dung
    this.ThemNguoiDung = function (nguoiDung){
        return axios({
            method: "POST",
            url:"http://5dce9e1775f9360014c26016.mockapi.io/api/nguoidung",
            data: nguoiDung
        });
    };


    //Xoa nguoi dung
    this.Delete = function(id){
        return axios({
            method: "DELETE",
            url:`http://5dce9e1775f9360014c26016.mockapi.io/api/nguoidung/${id}` 

        });
    };


    //Lay thong tin nguoi dung
    this.layThongTinND = function(id){
        return axios({
            method: "GET",
            url:`http://5dce9e1775f9360014c26016.mockapi.io/api/nguoidung/${id}` 

        });
    };


    //Cap nhat nguoi dung
    this.capNhatNguoiDung = function(id, user){
        return axios({
            method: "PUT",
            url:`http://5dce9e1775f9360014c26016.mockapi.io/api/nguoidung/${id}` ,
            data: user
        })
    }


    //Tim kiem nguoi dung
    this.timKiemNguoiDung = function(chuoiTimKiem, searchND){
        return searchND.filter(function(item) {
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
         })
    };


}


