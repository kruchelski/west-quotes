import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { setDefaultHeaders } from '../../config/RequestConfig';
import { useAuth, useQuote } from '../../hooks';
import { HttpService } from '../../services';
import styles from './styles';

export default ({ navigation, route }) => {

	const { authState, signOut } = useAuth();
	const { quoteState, getQuote, quoteErrorHandler } = useQuote();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const requestQuote = async () => {
			setLoading(true);
			try {
				await getQuote();
			} catch (err) {
				quoteErrorHandler(err, 'An error happened while trying to get a quote');
			} finally {
				setLoading(false);
			}
		}


		if (!!!quoteState?.quote?.quoteBody?.uuid) {
			requestQuote();
		}
	}, [])

	if (!!!quoteState?.quote?.quoteBody?.uuid || loading) {
		return (
			<View>
				<Text>
					Carregando
				</Text>
			</View>
		)
	} else {
		return (
			<View
				style={styles.container}
			>
				<Text
					style={styles.preQuoteText}
				>
					Kanye West says:
				</Text>
				<Text
					style={styles.quoteText}
				>
					{`"${quoteState.quote.quoteBody.text}"`}
				</Text>

				<ScrollView
					contentContainerStyle={styles.infoContainer}
				>
					<View
						style={styles.imageContainer}
					>
						<Image source={{ uri: quoteState.image }} style={styles.image} resizeMode='contain' />
					</View>

					<Text>UUID</Text>
					<Text>{quoteState.quote.quoteBody.uuid}</Text>
					<Text>Ocurrences</Text>
					<Text>{quoteState.quote.quoteBody.occurrences}</Text>
					<Text>Likes</Text>
					<Text>{quoteState.quote.quoteBody.likes}</Text>
				</ScrollView>

			</View>
		);
	}

}