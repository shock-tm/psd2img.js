# psd2img.js

shock tm

https://adodtp.com/

===

"psd2img.js" that analyzes psd files and displays preview images in HTML.

URL scheme must be "http" or "https".

The psd files that can be analyzed are "8bit" or "16bit" in grayscale, RGB or CMYK.

「psd2img.js」はpsdファイルを分析してプレビュー画像をHTMLで表示させます。

URLスキームは「http」または「https」である必要があります。

分析できるpsdファイルは「8bit」か「16bit」でグレースケール、RGBもしくはCMYKです。

### Usage
Step 1:include psd2img.js in your page.

    <script src="psd2img.js"></script>

Step 2: Create an img tag and enter the psd file path in src or name.

    <img src="PhotoShopFile.psd" id="img01">
    <img name="PhotoShopFile.psd" class="imgs">
    <img src="PhotoShopFile.psd">

Step 3: Run the script after reading the HTML.

    <script>
        psd2img({
            target:"#img01",
            attr:"src"
        });
        psd2img({
            target:".imgs",
            attr:"name"
        });
        psd2img({
            target:"img",
            attr:"src"
        });
    </script>

### Options
Can optionally specify the psd file path.

    <img class="readLaters">

    <script>
        psd2img({
            target:".readLaters",
            src:"PhotoShopFile.psd"
        });
    </script>

### Browser Support
- Google Chrome  
- Firefox  
- Edge

+unconfirmed
 - Safari  

### License 
You may use psd2img.js under the terms of the MIT License.

[More information](http://en.wikipedia.org/wiki/MIT_License)
