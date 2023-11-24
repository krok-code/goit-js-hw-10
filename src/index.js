import { fetchBreeds, fetchCatByBreed } from "./cat-API";

document.addEventListener('DOMContentLoaded', () => {
	const breedSelect = document.querySelector('.breed-select');
	const loader = document.querySelector('.loader');
	const error = document.querySelector('.error');
	const catInfo = document.querySelector('.cat-info');

	loader.style.display = 'none';
	error.style.display = 'none';

	fetchBreeds()
		.then(breeds => {
			breeds.forEach(breed => {
				const option = document.createElement('option');
				option.value = breed.id;
				option.textContent = breed.name;
				breedSelect.appendChild(option);
			});
		})
		.catch(() => {
			error.style.display = 'block';
		});
	
	breedSelect.addEventListener('change', () => {
		const selectedBreedId = breedSelect.value;

		loader.style.display = 'block';
		catInfo.style.display = 'none';
		error.style.display = 'none';

		fetchCatByBreed(selectedBreedId)
			.then(catData => {
				const catImage = document.createElement('img');
				catImage.src = catData[0].url;

				const catName = document.createElement('h2');
				catName.textContent = catData[0].breeds[0].name;

				const catDescription = document.createElement('p');
				catDescription.textContent = catData[0].breeds[0].description;

				const catTemperament = document.createElement('p');
				catTemperament.textContent = catData[0].breeds[0].temperament;


				catInfo.innerHTML = '';

				catInfo.classList.add('flex-container')
				catInfo.appendChild(catImage);
				catInfo.appendChild(catName);
				catInfo.appendChild(catDescription);
				catInfo.appendChild(catTemperament);

				loader.style.display = 'none';

				catInfo.style.display = 'flex';
				catInfo.style.flexDirection = 'column';
				catInfo.style.alignitems = 'center';
			})
			.catch(() => {
				error.style.display = 'block';
				loader.style.display = 'none';
			});
	});
});