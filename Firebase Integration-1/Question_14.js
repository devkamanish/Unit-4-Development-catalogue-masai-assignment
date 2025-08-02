const deleteUser = (key) => {
  // ✅ FIX 1: Corrected URL by injecting dynamic key using template literal
  fetch(`https://userdb-bf9d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/${key}.json`, {
    method: 'DELETE',
  })
  .then(response => {
    // ✅ FIX 2: Removed unnecessary response.json() call for DELETE
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    console.log("User deleted successfully");

    // ✅ FIX 3: Dynamically remove the deleted user's DOM element
    const userElement = document.getElementById(`user-${key}`);
    if (userElement) {
      userElement.remove(); // Removes user entry from the displayed table or list
    }
  })
  .catch(error => {
    console.error("Error deleting user:", error);
  });
};
