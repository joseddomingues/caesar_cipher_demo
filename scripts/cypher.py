import argparse
import os


def caesar_cipher(text: str, shift: int) -> str:
    """Caesar cipher encryption algorithm

    Args:
        text (str): Text to be encrypted
        shift (int): Shift value for the Caesar cipher

    Returns:
        str: Encrypted text
    """
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    shifted_alphabet = alphabet[shift:] + alphabet[:shift]
    shifted_upper_alphabet = shifted_alphabet.upper()

    def translate(char: str):
        if char.isalpha():
            index = alphabet.find(char.lower())
            if index >= 0:
                if char.isupper():
                    return shifted_upper_alphabet[index]
                else:
                    return shifted_alphabet[index]
        return char

    return "".join(translate(char) for char in text)


def encrypt_file(input_file: str, output_file: str, shift: int) -> None:
    """Encrypts a file using the Caesar cipher

    Args:
        input_file (str): File to be encrypted
        output_file (str): File to save the encrypted text
        shift (int): Shift value for the Caesar cipher
    """
    try:
        with open(input_file, "r") as file:
            text = file.read()
            encrypted_text = caesar_cipher(text, shift)
        with open(output_file, "w") as file:
            file.write(encrypted_text)
        print("Encryption successful. Encrypted file saved as", output_file)
    except FileNotFoundError:
        print("File not found.")


if __name__ == "__main__":
    args = argparse.ArgumentParser()
    args.add_argument(
        "--main_text_file",
        help="Input file to be encrypted",
        type=str,
        default="main_text.txt",
    )
    args.add_argument(
        "--clue_text_file",
        help="Clue file to be encrypted",
        type=str,
        default="clue.txt",
    )
    args.add_argument(
        "--game_code",
        help="Game code",
        type=str,
        default="benji-bananas",
    )
    args.add_argument(
        "--shift",
        help="Shift value for the Caesar cipher",
        type=int,
        default=3,
    )
    args = args.parse_args()

    # Encrypt both texts and associate with the same game id
    main_output_file = f"{args.game_code}_main_text_encrypted.txt"
    clue_output_file = f"{args.game_code}_clue_encrypted.txt"

    encrypt_file(
        input_file=args.main_text_file,
        output_file=os.path.join(
            os.path.dirname(args.main_text_file), main_output_file
        ),
        shift=args.shift,
    )

    encrypt_file(
        input_file=args.clue_text_file,
        output_file=os.path.join(
            os.path.dirname(args.clue_text_file), clue_output_file
        ),
        shift=args.shift,
    )
