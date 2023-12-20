<template>
    <v-card>
        <v-img :src="pokemon.image" height="200"></v-img>
        <v-btn icon class="close-button" @click="closeCard">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider></v-divider>
        <v-card-text>
            <div class="detail-item">
                <span class="detail-label">Name:</span>
                <span class="detail-value">{{ pokemon.name }}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Weight:</span>
                <span class="detail-value">{{ pokemon.weight }}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Height:</span>
                <span class="detail-value">{{ pokemon.height }}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Types:</span>
                <span class="detail-value">{{ pokemon.types.join(', ') }}</span>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn text @click="shareToFriends">Share to my friends</v-btn>
            <v-btn icon @click="toggleFavorite">
                <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            pokemon: {
                name: 'Pikachu',
                image: 'https://example.com/pikachu.png',
                weight: '6.0 kg',
                height: '0.4 m',
                types: ['Electric']
            },
            isFavorite: false
        };
    },
    methods: {
        closeCard() {
            // Close the card
        },
        shareToFriends() {
            // Share the pokemon to friends
        },
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
        }
    }
};
</script>

<style scoped>
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
}
.detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.detail-label {
    font-weight: bold;
}
</style>
