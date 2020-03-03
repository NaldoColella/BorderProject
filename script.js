let borderRender = document.getElementById("border-render");
let result = document.getElementById("result");
let handler = {
  corners: ["topLeft", "topRight", "bottomLeft", "bottomRight"]
}
let mozCheckbox = document.querySelector('input[value="moz"]');
let webKitCheckbox = document.querySelector('input[value="webkit"]');
let type = 'px';
function createString() {
  let fullString = "";
  let fullStringNormal = "";
  let fullStringWebKit = "";
  let fullStringMoz = "";

  handler.corners.forEach(corner => {
    const item = handler[corner];
    const formatted = item.kebabName + ": " + item.value + type + ";\n";
    fullStringNormal += formatted;
    fullStringWebKit += "-webkit-" + formatted;
    fullStringMoz += "-moz-" + formatted;
  });

  fullString = fullStringNormal;

  if (mozCheckbox.checked) {
    fullString += fullStringMoz;
  }

  if (webKitCheckbox.checked) {
    fullString += fullStringWebKit;
  }

  result.value = fullString;
}

function updateRender(corner) {
  borderRender.style[corner.name] = corner.value + type;
  createString();
}

handler.corners.forEach(corner => {
  handler[corner] = {
    element: document.getElementById(corner),
    value: document.getElementById(corner).value,
    name: "border" + corner.replace(/^./, corner[0].toUpperCase()) + "Radius",
    set setValue(str) {
      this.value = str;
      updateRender(this);
    },
    get kebabName() {
      return this.name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    }
  }

  handler[corner].element.addEventListener("input", function (evt) {
    switch (type) {
      case 'px':
        this.value = this.value.replace(/[^0-9]/g, '').replace(/^0+/, '');
        if (!this.value) this.value = '0';
        break;
      case 'percentage':
        break;
      default:
        break;
    }

    handler[corner].setValue = this.value;
  });
});

createString();

result.addEventListener('focusin', function (e) {
  result.select();
  document.execCommand('copy');
});

mozCheckbox.addEventListener('change', () => {
  createString();
});
webKitCheckbox.addEventListener('change', () => {
  createString();
});