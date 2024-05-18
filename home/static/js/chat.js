function openChat(evt, chatName) {
  var i, chatContainer, tablinks;

  // Hide all chat containers
  chatContainer = document.getElementsByClassName("chat-container");
  for (i = 0; i < chatContainer.length; i++) {
    chatContainer[i].style.display = "none";
  }

  // Deactivate all tabs
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the selected chat and mark its tab as active
  document.getElementById(chatName).style.display = "block";
  evt.currentTarget.className += " active";
}
