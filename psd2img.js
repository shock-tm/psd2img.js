function psd2img(jsom){
    const listItems=document.querySelectorAll(jsom["target"]);
    if(window.fetch){
        if(jsom["src"]!=undefined){
            const path=jsom["src"];
            fetch(path).then(function(response) {
                response.arrayBuffer().then(function(ab){
                    var imgdata=bs2img(new Uint8Array(ab));
                    for(let i=0;i<listItems.length;i++){
                        listItems.item(i).src=imgdata;
                    };
                });
            });
        }else if(jsom["attr"]=="src"){
            for(let i=0;i<listItems.length;i++){
                const item=listItems.item(i);
                const path=item.src;
                fetch(path).then(function(response){
                    response.arrayBuffer().then(function(ab){
                        item.src=bs2img(new Uint8Array(ab));
                    });
                });
            };
        }else if(jsom["attr"]=="name"){
            for(let i=0;i<listItems.length;i++){
                const item=listItems.item(i);
                const path=item.name;
                fetch(path).then(function(response){
                    response.arrayBuffer().then(function(ab){
                        item.src=bs2img(new Uint8Array(ab));
                    });
                });
            };
        };
    };
};
function bs2img(bs){
    if(String.fromCharCode(bs[0],bs[1],bs[2],bs[3])=="8BPS"){
        var channels=byInt(bs,2,12,0);
        var Rows=byInt(bs,4,14,0);
        var Columns=byInt(bs,4,18,0);
        var Depth=byInt(bs,2,22,0);
        var color_mode=byInt(bs,2,24,0);
        var by=26;
        var ColData=byInt(bs,4,by,0);
        by=by+ColData+4;
        var irB=byInt(bs,4,by,0); 
        by=by+irB+4;
        var LmB=byInt(bs,4,by,0);
        by=by+LmB+4;
        var comp=byInt(bs,2,by,0);
        var zan=bs.length-by-2;
        by=by+2;
        var bmp=new Array();
        var bmpLength=Columns*Rows*4+54;
        for(var ume=0;ume<bmpLength;ume++){
            bmp[ume]=0;
        };
        var temp2=new Array();
        var temp4=new Array();
        bmp[0]=66;bmp[1]=77;
        temp4=GetBytes(bmpLength,4);bmp[2]=temp4[0];bmp[3]=temp4[1];bmp[4]=temp4[2];bmp[5]=temp4[3];
        bmp[10]=54;
        bmp[14]=40;
        temp4=GetBytes(Columns,4);bmp[18]=temp4[0];bmp[19]=temp4[1];bmp[20]=temp4[2];bmp[21]=temp4[3];
        temp4=GetBytes(Rows*(-1),4);bmp[22]=temp4[0];bmp[23]=temp4[1];bmp[24]=temp4[2];bmp[25]=temp4[3];
        bmp[26]=1;
        bmp[28]=32;
        bmp[46]=4;
        bmp[50]=4;
        var RLE=new Array();
        for(var t=0;t<zan;t++){
            RLE[t]=bs[t+by];
        };
        if(comp==1){
            var dest=new Array();
            var T=0;
            switch(color_mode){
                case 0:
                    T=Rows*2;
                    break;
                case 1:case 3:case 4:
                    T=Rows*(Depth/4*color_mode);
                    break;
                default:break;
            };
            var n=0,b=0;flag=false;
            do{
                if(RLE[T]==0){
                    if(flag){
                        dest[n]=RLE[T+1];
                        n=n+1;
                        T=T+2;
                    }else{
                        T=T+2;
                    };
                }else if(RLE[T]>128){
                    var RLEdat=257-RLE[T];
                    var co=n;
                    for(var co=n;co<n+RLEdat+1;co++){
                        dest[co]=RLE[T+1];
                    };
                    n=n+RLEdat;
                    T=T+2;
                    flag=true;
                }else{
                    var Mdat=RLE[T];
                    var zettai=1;
                    for(var co=n;co<n+Mdat+1;co++){
                        dest[co]=RLE[T+zettai];
                        zettai=zettai+1;
                    };
                    n=n+Mdat+1;
                    T=T+Mdat+2;
                    flag=true;
                };
            }while(T<RLE.length)
            RLE=dest;
        };
        var pix=Columns*Rows;
        var now=0;
        switch(color_mode){
            case 1:
                if(Depth==8){
                    for(var z=0;z<pix;z++){
                        bmp[now+56]=RLE[(0*pix)+z];
                        bmp[now+55]=RLE[(0*pix)+z];
                        bmp[now+54]=RLE[(0*pix)+z];
                        now=now+4;
                    };
                }else if(Depth==16){
                    var y=0;
                    for(var z=0;z<pix;z++){
                        bmp[now+56]=RLE[(0*pix)+y];
                        bmp[now+55]=RLE[(0*pix)+y];
                        bmp[now+54]=RLE[(0*pix)+y];
                        now=now+4;
                        y=y+2;
                    };
                }else{
                    return "";
                };
                break;
            case 3:
                if(Depth==8){
                    for(var z=0;z<pix;z++){
                        bmp[now+56]=RLE[(0*pix)+z];
                        bmp[now+55]=RLE[(1*pix)+z];
                        bmp[now+54]=RLE[(2*pix)+z];
                        now=now+4;
                    };
                }else if(Depth==16){
                    var y=0;
                    for(var z=0;z<pix;z++){
                        bmp[now+56]=RLE[(0*pix)+y];
                        bmp[now+55]=RLE[(2*pix)+y];
                        bmp[now+54]=RLE[(4*pix)+y];
                        now=now+4;
                        y=y+2;
                    };
                }else{
                    return "";
                };
                break;
            case 4:
                if(Depth==8){
                    for(var z=0;z<pix;z++){
                        bmp[now+56]=RLE[(0*pix)+z];
                        bmp[now+55]=RLE[(1*pix)+z];
                        bmp[now+54]=RLE[(2*pix)+z];
                        bmp[now+57]=RLE[(3*pix)+z];
                        now=now+4;
                    };
                }else if(Depth==16){
                    var y=0;
                    for(var z=0;z<pix;z++){
                        bmp[now+56]=RLE[(0*pix)+y];
                        bmp[now+55]=RLE[(2*pix)+y];
                        bmp[now+54]=RLE[(4*pix)+y];
                        bmp[now+57]=RLE[(6*pix)+y];
                        now=now+4;
                        y=y+2;
                    };
                }else{
                    return "";
                };
                break;
            default:
                return "";
                break;
        };
        return "data:image/bmp;base64,"+ToBase64String(bmp);
    }else{
        return "";
    };
};
function byInt(bs,bit,i,sta){
	var Ints;
	if(bit==2){
		Ints=ToInt16([bs[i+1],bs[i]]);
		return Ints;
	}else{
		Ints=ToInt32([bs[i+3],bs[i+2],bs[i+1],bs[i]]);
		return Ints;
	};
};
function ToInt16(byteArray){
	var value = 0;
	for ( var i = byteArray.length - 1; i >= 0; i--) {
			value = (value * 128) + byteArray[i];
	};
	return value;
};
function ToInt32(byteArray){
	var value = 0;
    for ( var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    };
    return value;
};
function GetBytes(v,n){
    var result_array = new Array(n);
    for(var i = 1; i <= n; i++){
        var shift = (i-1) * 8;
        result_array[n-i] = (v >>> shift) & 0xff;
    };
	result_array.reverse();
    return result_array;
};
function ToBase64String(arr) {
    var seed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    if (arr == null)
        return "====";
    var result = "";
    var c = 0;
    for (var i = 0; i < arr.length; i++) {
        switch(i % 3) {
        case 0:
            result += seed.charAt((arr[i]>>2)&0x3f);
            c = (arr[i]&0x03)<<4;
            break;
        case 1:
            result += seed.charAt(c | ((arr[i]>>4)&0x0f));
            c = (arr[i]&0x0f)<<2;
            break;
        case 2:
            result += seed.charAt(c | ((arr[i]>>6)&0x0f));
            result += seed.charAt(arr[i]&0x3f);
            c = 0;
            break;
        };
    };
    if (arr.length % 3 == 1) {
        result += seed.charAt(c);
        result += "==";
    } else if (arr.length % 3 == 2) {
        result += seed.charAt(c);
        result += "=";
    };
    return result;
};