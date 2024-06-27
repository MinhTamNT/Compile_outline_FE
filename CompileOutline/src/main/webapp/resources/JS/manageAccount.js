
// modal create the students

document.getElementById("addStudentAccount").addEventListener("click", function() {
    $('#studentAccountModal').modal('show');
});


//active user

document.getElementById("addStudentAccount").addEventListener("click", function() {
    $('#studentAccountModal').modal('show');
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-toggle-on')) {
        event.target.classList.remove('fa-toggle-on', 'text-success');
        event.target.classList.add('fa-toggle-off', 'text-secondary');
        event.target.title = "Activate";
        alert('Account deactivated!');
        let badge = event.target.closest('tr').querySelector('.badge');
        badge.textContent = 'Inactive';
        badge.classList.remove('bg-success', 'text-white');
        badge.classList.add('bg-danger', 'text-white');
    } else if (event.target.classList.contains('fa-toggle-off')) {
        event.target.classList.remove('fa-toggle-off', 'text-secondary');
        event.target.classList.add('fa-toggle-on', 'text-success');
        event.target.title = "Deactivate";
        alert('Account activated!');
        let badge = event.target.closest('tr').querySelector('.badge');
        badge.textContent = 'Active';
        badge.classList.remove('bg-danger', 'text-black');
        badge.classList.add('bg-success', 'text-white');
    }
});

document.querySelectorAll('.fa-trash-alt').forEach(item => {
    item.addEventListener('click', function() {
        alert('Delete action clicked!');
    });
});