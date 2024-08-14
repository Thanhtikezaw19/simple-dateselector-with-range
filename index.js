document.getElementById('choices').addEventListener('change', function() {
  const selectedValue = this.value;

  // Hide all content divs
  const divs = document.querySelectorAll('#monthly, #daily, #yearly, #fourth_quater');
  divs.forEach(div => div.style.display = 'none');

  // Show the selected content
  const selectedDiv = document.getElementById(selectedValue);
  if (selectedDiv) {
      selectedDiv.style.display = 'block';
  }
});

// Initially hide all content divs except the default one (monthly)
document.addEventListener('DOMContentLoaded', function() {
  const divs = document.querySelectorAll('#daily, #yearly, #fourth_quater');
  divs.forEach(div => div.style.display = 'none');
});

const boxes = document.querySelectorAll('.box');
let isDragging = false;
let startIndex = null;

boxes.forEach((box, index) => {
  box.addEventListener('mousedown', (e) => {
    isDragging = true;
    startIndex = index;
    clearSelection();
    box.classList.add('selected');
  });

  box.addEventListener('mouseenter', () => {
    if (isDragging) {
      clearSelection();
      selectRange(startIndex, index);
    }
  });

  box.addEventListener('mouseup', () => {
    isDragging = false;
  });
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

function clearSelection() {
  boxes.forEach(box => box.classList.remove('selected'));
}

function selectRange(start, end) {
  const [min, max] = [Math.min(start, end), Math.max(start, end)];
  for (let i = min; i <= max; i++) {
    boxes[i].classList.add('selected');
  }
}
