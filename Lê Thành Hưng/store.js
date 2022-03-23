if(document.readyState == 'loading'){
  document.addEventListener('trang',ready) // trang da tai xong chua? 
} else{
  ready()
}

function ready(){

  var removeButton = document.getElementByClassName('class1')
  console.log(removeButton)
  for (var i=0; i < removeButton.length; i++){
    var button = removeButton[i]
    button.addEventListener('click', removeVatPham) // xoa hang hoa = click
  }
  
  var soLuongThayDoi = document.getElementByClassName('class7') // thay doi so luong san pham trong gio hang
  for (var i=0; i < soLuongThayDoi.length; i++){
    var input = soLuongThayDoi[i]
    input.addEventListener('change', soLuongChanged) //thay doi so luong
  }
  
  var themGioHang = document.getElementByClassName('class8') 
  for (var i=0; i < themGioHang.length; i++){
    var themHang = themGioHang[i]
    themHang.addEventListener('click', addVatPham) // them hang = click
  }
  
  document.getElementByClassName('class14')[0].addEventListener('click', muaHang) // mua hang va lam moi gio hang
}


function muaHang(){
  alert('Ban da mua hang thanh cong')
  var gioVatPham = document.getElementByClassName('class11')[0]
  while(gioVatPham.hasChildnode()){
    gioVatPham.removeChild(gioVatPham.firstChild)
  }
  updateGioHang()
}


function removeVatPham(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateGioHang()
}


function soLuongChanged(event){
  var input = event.target
  if (isNaN(input.value) || input.value <=0 ){
    input.value = 1
  }
  updateGioHang()
}


function addVatPham(event){
  var themHang = event.target
  var vatPham = themHang.parentElement.parentElement
  var tieuDe = vatPham.getElementByClassName('class9')[0].innerText // lay van ban thong tin san pham
  var giaVatPham = vatPham.getElementByClassName('class10')[0].innerText
  var imageSrc = vatPham.getElementByClassName('class10')[0].src // lay hinh anh san pham
  addThongTinSanPham(tieuDe, giaVatPham, imageSrc)
  updateGioHang()
}


function addThongTinSanPham(tieuDe, giaVatPham, imageSrc){
  var gioHangVatPham = document.createElement('div')
  gioHangVatPham.classList.add('class12') //dieu chinh vi tri san pham trong gio
  var gioVatPham = document.getElementByClassName('class11')
  var gioTenVatPham = gioVatPham.getElementByClassName('class13')
  for(var i = 0; i < gioTenVatPham.length; i++){
    if(gioTenVatPham[i].innerText == tieuDe){
      alert('San pham da co trong gio hang')
      return
    }  
  }
  
  var noiDungVatPham = `   `  //thong tin tu nguon HTML
  gioHangVatPham.innerHTML = noiDungVatPham
  gioVatPham.append(gioHangVatPham)
  gioHangVatPham.getElementByClassName('class1')[0].addEventListener('click', removeVatPham) //xoa san pham = click
  gioHangVatPham.getElementByClassName('class5')[0].addEventListener('change', soLuongChanged) 
}


function updateGioHang(){
  var thungHangVatPham = document.getElementByClassName('class2')[0]
  var gioHangVatPham = thungHangVatPham.getElementByClassName('class3')
  var giaTong = 0
  for (var i=0; i < gioHangVatPham.length; i++){
    var gioHangVatPham = gioHangVatPham[i]
    var giaPhanTu = gioHangVatPham.getElementByClassName('class4')[0]
    var soLuongPhanTu = gioHangVatPham.getElementByClassName('class5')[0]
    var giaVatPham = parseFloat(giaPhanTu.innerText) //lay gia san pham tu van ban (neu can)
    var soLuongVatPham = soLuongPhanTu.value
    giaTong = giaTong + (giaVatPham * soLuongVatPham)
  }
  giaTong = Math.round(giaTong*100)/100 //lam tron gia tong 2 số sau dau phay (neu can)
  document.getElementByClassName('class6')[0].innerText = giaTong
}