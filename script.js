let items = []; // { desc: string, amount: number }

const listEl  = document.getElementById("list");
const totalEl = document.getElementById("total");
const descEl  = document.getElementById("desc");
const amtEl   = document.getElementById("amount");


(function init(){
  const saved = localStorage.getItem("expenses");
  if (saved) items = JSON.parse(saved);
  render();

  if (localStorage.getItem("expDark") === "1") {
    document.body.classList.add("dark");
  }
})();

function addExpense(){
  const desc = descEl.value.trim();
  const raw  = amtEl.value.trim();

  if (!desc) { alert("Enter description."); return; }
  if (raw === "" || isNaN(Number(raw))) { alert("Enter a valid amount."); return; }

  const amount = parseFloat(raw);
  items.push({ desc, amount });
  save();
  render();

  descEl.value = "";
  amtEl.value  = "";
  descEl.focus();
}

function render(){
  listEl.innerHTML = "";
  let total = 0;

  items.forEach((it, idx) => {
    total += it.amount;

    const li = document.createElement("li");

    const left = document.createElement("div");
    left.innerHTML =
      `<strong>${it.desc}</strong> <span class="badge">₱${it.amount.toFixed(2)}</span>`;

    const del = document.createElement("button");
    del.textContent = "✖";
    del.style = "border:0;background:#ef4444;color:#fff;border-radius:8px;padding:6px 10px;cursor:pointer;";
    del.onclick = () => removeAt(idx);

    li.appendChild(left);
    li.appendChild(del);
    listEl.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

function removeAt(i){
  items.splice(i, 1);
  save();
  render();
}

function clearAll(){
  if (!confirm("Clear all expenses?")) return;
  items = [];
  save();
  render();
}

function save(){
  localStorage.setItem("expenses", JSON.stringify(items));
}

function toggleDark(){
  document.body.classList.toggle("dark");
  localStorage.setItem("expDark", document.body.classList.contains("dark") ? "1" : "0");
}
