"use strict";


async function fetchAndDisplayMemos() {
  const response = await fetch("/memos");
  const memos = await response.json();

  const memoList = document.getElementById("memos");
  memoList.innerHTML = ""; 

  memos.forEach((memo, index) => {
    const li = document.createElement("li");
    li.textContent = memo;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "メモを消去";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = async () => {
      await deleteMemo(index);
      await fetchAndDisplayMemos();
    };

    li.appendChild(deleteBtn);
    memoList.appendChild(li);
  });
}


async function addMemo() {
  const memoInput = document.getElementById("memo-input");
  const memoText = memoInput.value.trim();
  if (memoText === "") return;

  await fetch("/memos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: memoText }),
  });

  memoInput.value = ""; 
  await fetchAndDisplayMemos();
}


async function deleteMemo(index) {
  await fetch("/memos/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index }),
  });
}


document.getElementById("add-memo").addEventListener("click", addMemo);


fetchAndDisplayMemos();
