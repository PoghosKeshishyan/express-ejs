const deleteUser = async (id) => {
    const question = confirm("Are you sure you want to delete this user?");
    
    if (!question) {
        return;
    }

    try {
        const response = await fetch(`/remove/user/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            location.reload();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        alert("Error deleting user: " + error.message);
    }
};